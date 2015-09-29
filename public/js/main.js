var containerW = $(".container").width(),
  containerH = $(".container").height(),
  nodes = $(".node").not("#center"),
  indexNode = $("#center");

//center with TweenMax to help with browser compatability
TweenMax.set($("#center"), {
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
function center(node) {
  //get the dimensions of the title element and the center element
  var indexNode = $("#center"),
    centerW = indexNode.innerWidth(),
    centerH = indexNode.innerHeight(),
    nodes = $(".node"),
    nodeCoordinates = {};
  if(!node) {
    node = null;
  } else {
    nodeCoordinates["x"] = $(node).offset().left;
    nodeCoordinates["y"] = $(node).offset().top;
  }
  //find center node's center coordinates
  var centerX = indexNode.offset().left + centerW / 2,
    centerY = indexNode.offset().top + centerH / 2;
  var points = {
    x: centerX,
    y: centerY,
    node: nodeCoordinates
  }
  return points;
}

$(".node").on("aniStart aniUpdate aniComplete", function() {
  //get the object whose name is the same as the one that triggered the evaluation
  //nodeObject[node] gets the object tha contains all the path data and the evaluated coordinates
  //jquery node Object (nodes), gets a separate object that also contains the coordinates, but does not contain the path data
});
