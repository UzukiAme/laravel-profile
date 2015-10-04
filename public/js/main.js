var containerW = $(".container").width(),
  containerH = $(".container").height(),
  nodes = $(".node").not("#center"),
  indexNode = $("#center"),
  windowW = $(window).width(),
  windowH = $(window).height();

//center with TweenMax to help with browser compatability
TweenMax.set($("#center"), {
  xPercent: -50,
  yPercent: -50
});

/**
* Get the quadrant or direction the given point is in relative to the index element.
* @param {integer}
* @returns {string} descriptor of the quadrant or direction (top left, up, down, etc.)
*   Defaults to null if there are no coordinates put in
*/
function getQuadrant(angle) {
  if(angle > 0 && angle <= 90){
    return "bottom-right";
  } else if(angle > 90 && angle <= 180) {
    return "bottom-left";
  } else if(angle > 180 && angle <= 270) {
    return "top-left";
  } else if(angle > 270 && angle <= 360) {
    return "top-right";
  } else {
    return null;
  }
}

/**
* Get the x and y coordinates, relative to the window, of the center of the index node.
*   Currently this funcion only gets one point. However, I anticipate needing to include other
*   points in the future. So the name will remain the same.
* @returns {array} x and y coordinates for the index.
*/
function center(node) {
  var indexNode = $("#center"),
    node = $(node) || null,
    centerW = indexNode.innerWidth(),
    centerH = indexNode.innerHeight(),
    nodeW = node.width() || 0,
    nodeH = node.height() || 0,
    nodeC = node.offset() || 0,
    nodeT = nodeC.top,
    nodeL = nodeC.left,
    nodes = $(".node"),
    nodeCenter = {x:nodeL + nodeW/2, y:nodeT + nodeH/2};
  var centerX = indexNode.offset().left + centerW / 2,
    centerY = indexNode.offset().top + centerH / 2;
  var points = {
    x: centerX,
    y: centerY,
    node: nodeCenter
  }
  return points;
}

/**
* Get the angle the node is currently at relative to the center of the index
* @param {object} jquery object
*/
function getAngle(node) {
  var centers = center(node),
    indexC = {x:centers.x, y:centers.y},
    nodeCenter = {x:centers.node.x, y:centers.node.y};
  return Raphael.angle(nodeCenter.x, nodeCenter.y, windowW, indexC.y, indexC.x, indexC.y);
}

/**
* Perform the math to get a paint on the inner circle along which everytthing is
*   aligned
*/
function getCircleIntersect(angle) {
  var centers = center(),
    x = centers.x + (windowW * .1) * Math.cos(Raphael.rad(angle)),
    y = centers.y + (windowW * .1) * Math.sin(Raphael.rad(angle));
  return {x:x, y:y}
}
