
/*
* Make a container for the nodes
* Give it a z-index of 0 and the index node 1
* Create a canvas within that container and give it a z-index of -1
* Create a circle around the index node that represents its final shape
* Create an arc that mirrors the arc of this circle for the nodes to align on
* Possibly use GSAP to get coordinates along the circle for end points for raphael drawings
* Calculate start points by the coordinates of the nodes
* Draw svg elements with calculated coordinates; Create constructor function that figures (takes?) out the coordinates for a drawing. Use that funciton to create connector objects, each with their own coordinate  concerns, rather than trying to make one function draw every path.
*/

var nodes = $(".node").not("#center-node"),
  indexNode = $("#center-node"),
  container = $(".container");
var windowW = $(window).width(),
  windowH = $(window).height(),
  paper = new Raphael("svg-container", windowW, windowH),
  globalTl = new TimelineMax();
var containerW;
container.width(windowW).height(windowH);

/**
* Called on window resize to redraw all the custom svg and reevaluate any global variables that will affect the drawing of
* that svg.
*/
function recalculate() {
  windowW = $(window).width();
  windowH = $(window).height();
  if($("svg")) {
    $("svg").remove();
  }
  if($(".end-left")) {
    $(".end-left").remove();
  }
  paper = new Raphael("svg-container", windowW, windowH);
  containerDimensions();
  createCenter();
  repositionStart();
}


/**
* Divide the nodes into two arrays used to position them either above or below the index element
* @param {array} either a jquery object or an array of elements that are to be devided
* @returns {array} an array that contains the two created by the division
*/
function divideNodes(items) {
  var mod = items.length % 2,
    nodePos = 0,
    screenLeft = [],
    screenRight = [],
    half,
    t = 0,
    b = 0;

  if(mod == 1) {
    half = (items.length - 1)/2;
    for(i = 0, l = items.length; i < l; i++) {
      if(i < half + 1) {
        screenLeft[t] = items[i];
        t++;
      } else {
        screenRight[b] = items[i];
        b++;
      }
    }//end for
  } else {
    half = items.length/2;
    for(i = 0, l = items.length; i < l; i++) {
      if(i < half) {
        screenLeft[t] = items[i];
        t++;
      } else {
        screenRight[b] = items[i];
        b++;
      }
    }//end for
  }//end if mod
  var divisions = {screenLeft: screenLeft, screenRight: screenRight};
  return divisions;
}//end function
var leftNodes = divideNodes(nodes).screenLeft,
  rightNodes = divideNodes(nodes).screenRight,
  divisions = divideNodes(nodes);

function containerDimensions() {
  var section = windowW/(nodes.length + 2);

  var dimensions = {section:section};
  return dimensions;
}
containerDimensions();
var section = containerDimensions().section;

function createCenter() {

  var radius = windowW * .1,
    circumference = Math.PI * radius * 2;
    indexCircle = paper.circle(elemPoints().indexCenterX, elemPoints().indexCenterY, radius);
}
createCenter();

/**
* Calculates the points to be used in the bezier plugin for the initial animation
* @returns {array} the end position of every node and the path objects to be used in the tween
*/
function introPaths(nodes) {
  var endPoints = [],
    pathsPoints = [],
    guidePathLeft = "M" + (windowW * .2) + " " + (windowH - 100) + "C " + (windowW * .05) + " " + (windowH - 130) + " " + (windowW * .05) + " 80 " + (windowW * .2) + " 50",
    guidePathRight = "M" + (windowW - (windowW * .2)) + " " + (windowH - 100) + "C " + (windowW - (windowW * .05)) + " " + (windowH - 130) + " " + (windowW - (windowW * .05)) + " 80 " + (windowW - (windowW * .2)) + " 50",
    guideRight = paper.path(guidePathRight).attr({"stroke":"transparent"}),
    guideRightPoints = Raphael.parsePathString(guidePathRight),
    guideLeftPoints = Raphael.parsePathString(guidePathLeft),
    guideLeft = paper.path(guidePathLeft).attr({"stroke":"transparent"}),
    guideLeftLength = guideLeft.getTotalLength(),
    guideRightLength = guideRight.getTotalLength();

  if(nodes == leftNodes) {
    //Set the start point for the left nodes based on where the bezier path starts
    //The right node start position must be relative to their width so the items end up inside the curve, and so must be set inside the loop that animates them below
    TweenMax.set($(nodes), {x:guideLeftPoints[0][1], y:guideLeftPoints[0][2]});

    //Create a tween for each of the left nodes along the same bezier, but a shorter section of it for each consecutive node
    for(i = 0, quantity = nodes.length, p = quantity - 1; i < quantity; i++, p--) {
      var leftNode = nodes[i];

      //if there are more than 2 nodes, there can be a node at each end point, but if there are fewer than that, the nodes
      // should be aligned in such a way that they land closer to the widest point of the arc.
      if(l > 2) {
        var section = guideLeftLength/(quantity - 1),
          pathLength = section * p;
      } else {
        var section = guideLeftLength/(quantitiy + 2),
          pathLength = section * (p+1);
        p -= 1;
      }
      var path = guideLeft.getSubpath(0, pathLength),
        segmentArray = Raphael.parsePathString(path),
        points = [{x:segmentArray[0][1], y:segmentArray[0][2]}, {x:segmentArray[1][1], y:segmentArray[1][2]}, {x:segmentArray[1][3], y:segmentArray[1][4]}, {x:segmentArray[1][5], y:segmentArray[1][6]}];
      endPoints.push({x:segmentArray[1][5], y:segmentArray[1][6], node:$(leftNode).attr("id")});
      pathsPoints.push(points);
    }
  } else if(nodes == rightNodes) {
    //Do the same as above for the right nodes. Starts in reverse of the above loop because I am starting with
    //2 nodes on the right side.
    for(j = 0, rQuantity = nodes.length, q = rQuantity; j < rQuantity; j++, q-=2) {
      var rNode = nodes[j],
        rNodeW = $(rNode).width();

      //set start point for right nodes
      TweenMax.set($(rNode), {x:guideRightPoints[0][1]-rNodeW, y:guideRightPoints[0][2]});
        if(j < 2) {
        var rSection = guideRightLength/(rQuantity + 2),
          rPathLength = rSection * (q+1);
      } else {
        var rSection = guideRightLength/(rQuandtity - 1),
          rPathLength = rSection * q;
      }
      var rPath = guideRight.getSubpath(0, rPathLength),
        rSegmentArray = Raphael.parsePathString(rPath),
        rPoints = [{x:rSegmentArray[0][1]-rNodeW, y:rSegmentArray[0][2]}, {x:rSegmentArray[1][1]-rNodeW, y:rSegmentArray[1][2]}, {x:rSegmentArray[1][3]-rNodeW, y:rSegmentArray[1][4]}, {x:rSegmentArray[1][5]-rNodeW, y:rSegmentArray[1][6]}];
      endPoints.push({x:rSegmentArray[1][5]-rNodeW, y:rSegmentArray[1][6], node:$(rNode).attr("id")});
      pathsPoints.push(rPoints);
    }
  } else {
    return undefined;
  }
  var returnVals = {endPoints:endPoints, pathsPoints:pathsPoints};
  return returnVals;
  console.log(pathsPoints);
}

/**
* Executes the animation to initial positions
*/
function alignNodes() {
  var leftVals = introPaths(leftNodes).pathsPoints,
    rightVals = introPaths(rightNodes).pathsPoints;
  leftVals.forEach(function(bezier, i) {
    var leftNode = leftNodes[i];
    if(i == 0) {
      globalTl.add(TweenMax.to(leftNode, 2, {bezier:{values:bezier}, ease:Sine.easeOut}), "start");
    } else {
      globalTl.add(TweenMax.to(leftNode, 2, {bezier:{values:bezier}, ease:Sine.easeOut}), "-=1.5");
    }
  });
  rightVals.forEach(function(bezier, i) {
    var rightNode = rightNodes[i];
    if(i == 0) {
      globalTl.add(TweenMax.to(rightNode, 2, {bezier:{values:bezier}, ease:Sine.easeOut}), "start");
    } else {
      globalTl.add(TweenMax.to(rightNode, 2, {bezier:{values:bezier}, ease:Sine.easeOut}), "-=1.5");
    }
  });
}
alignNodes();

function repositionStart() {
  var left = introPaths(leftNodes).endPoints,
    right = introPaths(rightNodes).endPoints;
  left.forEach(function(item, i) {
    var node = $("#" + item.node);
    node.css({top:item.y, left:item.x, transform:"none"});
  });
  right.forEach(function(item, i) {
    var node = $("#" + item.node);
    node.css({top:item.y, left:item.x, transform:"none"});
  });
}
window.onresize = recalculate;
