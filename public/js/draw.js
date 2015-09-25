
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
  alignNodes();
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

//Place elements on side arc that begins at a constant y value and ends at a y value that is the height of the window minus a constant value. This way, the arc will expand and shrink with the height of the window. The x coordinates should be a percentage of the window width in typical responsive fashion. At the break point (tbt), the orientation of the nodes will rotate 90 degrees

function createCenter() {

  var radius = windowW * .1,
    circumference = Math.PI * radius * 2;
    indexCircle = paper.circle(elemPoints().indexCenterX, elemPoints().indexCenterY, radius);
}
createCenter();

/**
* Executes the initial animation that positions the nodes. The connectors are aligned with the x and y coordinates of the nodes
* before animation and on every update of the position.
*/

function alignNodes() {
  var arbitrary,
    guidePathLeft = "M" + (windowW * .2) + " " + (windowH - 100) + "C " + (windowW * .05) + " " + (windowH - 130) + " " + (windowW * .05) + " 80 " + (windowW * .2) + " 50",
    guidePathRight = "M" + (windowW - (windowW * .2)) + " " + (windowH - 100) + "C " + (windowW - (windowW * .05)) + " " + (windowH - 130) + " " + (windowW - (windowW * .05)) + " 80 " + (windowW - (windowW * .2)) + " 50",
    guideRight = paper.path(guidePathRight).attr({"stroke":"transparent"}),
    guideLeft = paper.path(guidePathLeft).attr({"stroke":"transparent"}),
    guideLeftPoints = Raphael.parsePathString(guidePathLeft),
    guideRightPoints = Raphael.parsePathString(guidePathRight),
    guideLeftLength = guideLeft.getTotalLength(),
    guideRightLength = guideRight.getTotalLength();
  TweenMax.set($(leftNodes), {x:guideLeftPoints[0][1], y:guideLeftPoints[0][2]});

  for(i = 0, l = leftNodes.length, p = l - 1; i < l; i++, p--) {
    var leftNode = leftNodes[i],
      quantitiy = l,
      segmentArray = Raphael.parsePathString(guidePathLeft);
    if(l > 2) {
        var section = guideLeftLength/(quantitiy - 1),
        pathLength = section * p,
        path = guideLeft.getSubpath(0, pathLength),
        segmentArray = Raphael.parsePathString(path),
        points = [{x:segmentArray[0][1], y:segmentArray[0][2]}, {x:segmentArray[1][1], y:segmentArray[1][2]}, {x:segmentArray[1][3], y:segmentArray[1][4]}, {x:segmentArray[1][5], y:segmentArray[1][6]}];
        if(i == 0) {
          globalTl.add(TweenMax.to(leftNode, 2, {bezier:{values:points}, ease:Sine.easeOut}), "start");
        } else {
          globalTl.add(TweenMax.to(leftNode, 2, {bezier:{values:points}, ease:Sine.easeOut}), "-=1.5");
        }
    } else {
      var section = guideLength/(quantitiy + 1),
        pathLength = section * (p-1),
        segmentArray = Raphael.parsePathString(path);
        path = guideLeft.getSubpath(0, pathLength),
        points = [{x:segmentArray[0][1], y:segmentArray[0][2]}, {x:segmentArray[1][1], y:segmentArray[1][2]}, {x:segmentArray[1][3], y:segmentArray[1][4]}, {x:segmentArray[1][5], y:segmentArray[1][6]}];
      globalTl.add(TweenMax.to(node, 2, {bezier:{values:points}, ease:Sine.easeOut}), "-=1.5");
    }
  }

  for(j = 0, rQuantity = rightNodes.length, q = rQuantity; j < rQuantity; j++, q-=2) {
    var rNode = rightNodes[j],
      rNodeW = $(rNode).width();
    TweenMax.set($(rightNodes), {x:guideRightPoints[0][1]-rNodeW, y:guideRightPoints[0][2]});
    var rSection = guideRightLength/(rQuantity + 2),
      rPathLength = rSection * (q+1),
      rPath = guideRight.getSubpath(0, rPathLength),
      rSegmentArray = Raphael.parsePathString(rPath),
      rPoints = [{x:rSegmentArray[0][1]-rNodeW, y:rSegmentArray[0][2]}, {x:rSegmentArray[1][1]-rNodeW, y:rSegmentArray[1][2]}, {x:rSegmentArray[1][3]-rNodeW, y:rSegmentArray[1][4]}, {x:rSegmentArray[1][5]-rNodeW, y:rSegmentArray[1][6]}];
      console.log(rSegmentArray);
    if(j == 0) {
      globalTl.add(TweenMax.to(rNode, 2, {bezier:{values:rPoints}, ease:Sine.easeOut}), "start");
    } else {
      globalTl.add(TweenMax.to(rNode, 2, {bezier:{values:rPoints}, ease:Sine.easeOut}), "-=2");
    }
  }
}
alignNodes();
window.onresize = recalculate;
