
var container = $(".container");
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
    $("path").not(".connector").remove();
  }
  if($(".end-left")) {
    $(".end-left").remove();
  }
  paper = new Raphael("svg-container", windowW, windowH);
  containerDimensions();
  createCenter();
  //once click animations are executed, this should no longer execute.
  var allEndPoints = combineEndPointsArrays().all;
  $(nodes).each(function(i, node) {
    var nodeId = $(node).attr("id");
    $(node).css({left:allEndPoints[nodeId].x, top:allEndPoints[nodeId].y, transform:"none"});
  });
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

function createCenter() {
  var radius = windowW * .1,
    circumference = Math.PI * radius * 2;
    indexCircle = paper.circle(center().x, center().y, radius);
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
    guideLeftLength = Raphael.getTotalLength(guidePathLeft),
    guideRightLength = Raphael.getTotalLength(guidePathRight);

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
        var rSection = guideRightLength/(rQuantity - 1),
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
}

/**
* Executes the animation to initial positions
*/
function alignNodes() {
  function triggerStart(node) {
    var event = $(node).attr("id") + ".start";
    $(node).trigger(event);
    $(".node").trigger("start");
  }
  function triggerEnd(node) {
    var event = $(node).attr("id") + ".end";
    $(node).trigger(event);
  };
  function triggerUpdate() {
    $(".node").trigger("update");
  };
  var leftVals = introPaths(leftNodes).pathsPoints,
    rightVals = introPaths(rightNodes).pathsPoints;
  leftVals.forEach(function(bezier, i) {
    var leftNode = leftNodes[i];
    if(i == 0) {
      globalTl.add(TweenMax.to(leftNode, 2, {bezier:{values:bezier}, ease:Sine.easeOut, onStart:triggerStart, onStartParams:[leftNode], onComplete:triggerEnd, onCompleteParams:[leftNode], onUpdate:triggerUpdate}), "start");
    } else {
      globalTl.add(TweenMax.to(leftNode, 2, {bezier:{values:bezier}, ease:Sine.easeOut, onStart:triggerStart, onStartParams:[leftNode], onComplete:triggerEnd, onCompleteParams:[leftNode],onUpdate:triggerUpdate}), "-=1.5");
    }
  });
  rightVals.forEach(function(bezier, i) {
    var rightNode = rightNodes[i];
    if(i == 0) {
      globalTl.add(TweenMax.to(rightNode, 2, {bezier:{values:bezier}, ease:Sine.easeOut, onStart:triggerStart, onStartParams:[rightNode], onComplete:triggerEnd, onCompleteParams:[rightNode], onUpdate:triggerUpdate}), "start");
    } else {
      globalTl.add(TweenMax.to(rightNode, 2, {bezier:{values:bezier}, ease:Sine.easeOut, onStart:triggerStart, onStartParams:[rightNode], onComplete:triggerEnd, onCompleteParams:[rightNode], onUpdate:triggerUpdate}), "-=1.5");
    }
  });
}
alignNodes();

/**
* Sets the nodes to the correct end points without going through the whole intro animation. Only called on window resize.
* @returns {array} all updated end points
*/
function combineEndPointsArrays() {
  var left = introPaths(leftNodes).endPoints,
    right = introPaths(rightNodes).endPoints,
    all = {};
  left.forEach(function(item, i) {
    all[item.node] = item;
  });
  right.forEach(function(item, i) {
    all[item.node] = item;
  });
  return {all:all};
}
var allEndPoints = combineEndPointsArrays().all;


/**
* Get the coordinates for the farthest ends of the connection from the index to the outer nodes
* @param {object} jQuery object for the node in question
* @returns {array} x and y of the intersection point on the node and on the circle
*/
function getBoundingPoints(node) {
  var node = $(node),
    top = node.offset().top,
    left = node.offset().left,
    width = node.width(),
    height = node.height(),
    centers = center(node),
    angle = getAngle(node),

    //set the coordinates for each of the four corners of the node in question
    corners = {
      tl:{x:left, y:top},
      tr:{x:left + width, y:top},
      bl:{x:left, y:top + height},
      br:{x:left + width, y:top + height}
    },

    //create the path string for each side
    sides = {
      top:"M" + corners.tl.x + " " + corners.tl.y + "L" + corners.tr.x + " " + corners.tr.y,
      right:"M" + corners.tr.x + " " + corners.tr.y + "L" + corners.br.x + " " + corners.br.y,
      bottom:"M" + corners.bl.x + " " + corners.bl.y + "L" + corners.br.x + " " + corners.br.y,
      left:"M" + corners.tl.x + " " + corners.tl.y + "L" + corners.bl.x + " " + corners.bl.y
    },

    //create the path from the center of the index to the center of the outer node
    intersectingPath = "M" + centers.node.x + " " + centers.node.y + "L" + centers.x + " " + centers.y,
    quadrant = getQuadrant(angle);

    /**
    * Check to see which of the two sides on the outer node is crossed by the connecting line and return the.
    *   coordinates of that intersection.
    * @param {string} the paths to compare
    * @returns {object} intersection information
    */
    function getIntersection(side1, side2) {
      intersect1 = Raphael.pathIntersection(side1, intersectingPath),
      intersect2 = Raphael.pathIntersection(side2, intersectingPath);
      if($.isEmptyObject(intersect1)) {
        return intersect2;
      } else {
        return intersect1;
      }
    }

    //Depending on the quadrant, the connection will cross one of two sides on the node.
    //Using the above function, determine which of the two sides the connecting line crosses
    if(quadrant == "bottom-right") {
      var side1 = sides.left,
        side2 = sides.right,
        intersection = getIntersection(side1, side2);
    } else if(quadrant == "bottom-left") {
      var side1 = sides.top,
        side2 = sides.right,
        intersection = getIntersection(side1, side2);
    } else if(quadrant == "top-left") {
      var side1 = sides.bottom,
        side2 = sides.right,
        intersection = getIntersection(side1, side2);
    } else if(quadrant == "top-right") {
      var side1 = sides.bottom,
        side2 = sides.left,
        intersection = getIntersection(side1, side2);
    }

    //Get the point on the center circle where the connecting line crosses
    var cix = getCircleIntersect(angle).x,
      ciy = getCircleIntersect(angle).y;
    return {node:{x:intersection[0].x, y:intersection[0].y}, circle:{x:cix, y:ciy}};
}

function drawConnections(node) {
  var node = $(node),
    points = getBoundingPoints(node),
    start = points.node,
    end = points.circle,
    guide = "M" + start.x + " " + start.y + "L" + end.x + " " + end.y,
    length = Raphael.getTotalLength(guide),
    angle = getAngle(node),
    quadrant = getQuadrant(angle);
    if(quadrant == "top-right" || quadrant == "bottom-right") {
      var control1 = {x:start.x - length/2, y:start.y - 10},
      control4 = {x:start.x - length/2, y:start.y + 10},
      ciTop = getCircleIntersect(angle - 9),
      ciBottom = getCircleIntersect(angle + 9)
    } else {
      var control1 = {x:start.x + length/2, y:start.y - 10},
      control4 = {x:start.x + length/2, y:start.y + 10},
      ciTop = getCircleIntersect(angle + 9),
      ciBottom = getCircleIntersect(angle - 9)
    }
    var controls = {
      control1:control1,
      control2:{x:ciTop.x, y:ciTop.y},
      anchor:{x:end.x, y:end.y},
      control3:{x:ciBottom.x, y:ciBottom.y},
      control4:control4,
      anchor2:{x:start.x, y:start.y}
    },
    connectingPath = "M" + start.x + " " + start.y + "C" + controls.control1.x + " " + controls.control1.y + " " + controls.control2.x + " " + controls.control2.y + " " + controls.anchor.x + " " + controls.anchor.y + "C" + controls.control3.x + " " + controls.control3.y + " " + controls.control4.x + " " + controls.control4.y + " " + controls.anchor2.x + " " + controls.anchor2.y;
    connector = paper.path(connectingPath);
    if(quadrant == "top-left" || quadrant == "bottom-left") {
      connector.attr({"stroke":"transparent", "fill":"0-#20272E-#A6C8EB"});
    } else {
      connector.attr({"stroke":"transparent", "fill":"0-#A6C8EB-#20272E"});
    }
    connector.node.setAttribute("class", "connector");
}

$(nodes).each(function(i, node) {
  $(node).on($(node).attr("id") + ".end", function() {
    drawConnections($(node));
  });
});


//if the path selector with the attr plugin doesn't work, set up access to each individual paper.path() declaration via globally scoped variables so the raphael plugin can manipulate them.
$("#skills").on($("#skills").attr("id") + ".end", function() {
  TweenMax.to($("path.skills-connector"), 2, {attr:{d:"M10 10C0 20 0 40 10 40C20 40 20 20 10 10", stroke:"black"}});
});

window.onresize = recalculate;
