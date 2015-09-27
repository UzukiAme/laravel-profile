var containerW = $(".container").width();
var containerH = $(".container").height();

//center with TweenMax to help with browser compatability
TweenMax.set($("#center-node"), {
  xPercent: -50,
  yPercent: -50
});

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

/**
* Get the x and y coordinates, relative to the window, of the center of the index node.
*   Currently this funcion only gets one point. However, I anticipate needing to include other
*   points in the future. So the name will remain the same.
* @returns {array} x and y coordinates for the index.
*/
function elemPoints() {
  //get the dimensions of the title element and the center element
  var indexNode = $("#center-node"),
    centerW = indexNode.innerWidth(),
    centerH = indexNode.innerHeight();
  //find center node's center coordinates
  var centerX = indexNode.offset().left + centerW / 2,
    centerY = indexNode.offset().top + centerH / 2;
  var points = {
    indexCenterX: centerX,
    indexCenterY: centerY,
  };
  return points;
}
