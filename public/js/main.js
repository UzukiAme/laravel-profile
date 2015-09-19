var containerW = $(".container").width();
var containerH = $(".container").height();

//center with TweenMax to help with browser compatability
TweenMax.set($("#center-node"), {
  xPercent: -50,
  yPercent: -50
});



/**
* Get the x and y coordinates of all node centers relative to the browser window.
* @returns {array} x and y coordinates for the node centers.
*/
function elemPoints(node) {
  var center = $("#center-node"),
    node = $(node) || undefined;
    elemW = node.outerWidth() || 0,
    elemH = node.outerHeight() || 0,
    centerW = center.innerWidth(),
    centerH = center.innerHeight(),
    elemCoords = node.offset() || 0,
    centerCoords = center.offset();
  var centerX = centerCoords.left + centerW / 2,
    centerY = centerCoords.top + centerH / 2;
  var nodeX = elemCoords.left + elemW / 2 || 0,
    nodeY = elemCoords.top + elemH / 2 || 0;

  var points = {
    indexCenterX: centerX,
    indexCenterY: centerY,
    nodeCenterX: nodeX,
    nodeCenterY: nodeY
  };

  return points;
}

/**
* Get the quadrant or direction the given point is in relative to the index element.
* @param {integer} x value of the point to be evaluated
* @param {integer} y value of the point to be evaluated
* @returns {string} descriptor of the quadrant or direction (top left, up, down, etc.)
*   Defaults to null if there are no coordinates put in
*/
function getQuadrant(x, y) {
  var indexCenterX = elemPoints().indexCenterX;
  var indexCenterY = elemPoints().indexCenterY;
  var x = x || 0;
  var y = y || 0;

  //default returns null
  if(x == 0 && y == 0) {
    return null;
  //quadrant top left: x < center and y < center
  } else if (x < indexCenterX && y < indexCenterY) {
    return "top left";
  //quadrant top right: x > center and y < center
  } else if(x > indexCenterX && y < indexCenterY) {
    return "top right";
  //quadrant bottom right: x > center and y > center
  } else if(x > indexCenterX && y > indexCenterY) {
    return "bottom right";
  //quadrant bottom left: x < center and y > center
  } else if(x < indexCenterX && y > indexCenterY) {
    return "bottom left";
  //90 deg: x == centerX
  } else if(x == indexCenterX) {
    //up: y < center
    if(y < indexCenterX) {
      return "up";
    //down: y > center
    } else {
      return "down";
    }
  //180 deg: y == centerY
  } else if(y == indexCenterY) {
    //left: x < center
    if(x < indexCenterX) {
      return "left";
    //right: x > center
    } else {
      return "right";
    }
  }
}

var height = $(window).height() - 40;
var width = $(window).width() - $("#center-node a").width();
$("#skills-node").click(function() {
  var tl = new TimelineMax();
  tl.to($("#center-node"), 3, {top:height, left:width, ease:Back.easeOut},"svg")
  .to($("svg"), 3, {top:"10px", height:"20px", width:"20px"},"svg")
  .to($("circle"), 3, {attr:{cx:10, cy:10}}, "svg");
});
