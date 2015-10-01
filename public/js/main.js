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
* @param {integer}
* @returns {string} descriptor of the quadrant or direction (top left, up, down, etc.)
*   Defaults to null if there are no coordinates put in
*/
function getQuadrant(angle) {
  if(angle < 0 && angle > -90){
    return "bottom-left";
  } else if(angle < 0 && angle < -90) {
    return "bottom-right";
  } else if(angle > 0 && angle < 90) {
    return "top-left";
  } else if(angle > 0 && angle > 90) {
    return "top-right";
  } else if(angle == 0) {
    return "left";
  } else if(angle == 90) {
    return "up";
  } else if(angle == 180) {
    return "right";
  } else if(angle == -90) {
    return "down";
  } else {
    return null;
  }
}

/**
* Get the coordinates that create the line on the side of a node that faces the
*   index at any gived position within the window, or all four corners if no quadrant is given
* @param {string} the quadrant descriptor from the above quadrant function
* @param {object} jQuery object for the node in question
* @returns {object} either coordinates for all four corners or coordinates for the side that faces the index
*/
function getNodeCorners(node, quadrant) {
  var quadrant = quadrant || null,
    top = $(node).offset().top,
    left = $(node).offset().left,
    width =$(node).width(),
    height = $(node).height(),
    corners = {
      tl:{x:left, y:top},
      tr:{x:left + width, y:top},
      bl:{x:left, y:top + height},
      br:{x:left + width, y:top + height}
    };
  if(quadrant != null) {
    if(quadrant == "top-left" || quadrant == "left" || quadrant == "bottom-left") {
      return [corners.tr, corners.br];
    } else if(quadrant == "up") {
      return [corners.bl, corners.br];
    } else if(quadrant == "bottom-right" || quadrant == "right" || quadrant == "top-right") {
      return [corners.tl, corners.bl];
    } else if(quadrant == "bottom") {
      return [corners.tr, corners.tl];
    } else {
      return null;
    }
  } else {
      return corners;
  }
}


/**
* Get the x and y coordinates, relative to the window, of the center of the index node.
*   Currently this funcion only gets one point. However, I anticipate needing to include other
*   points in the future. So the name will remain the same.
* @returns {array} x and y coordinates for the index.
*/
function center() {
  var indexNode = $("#center"),
    centerW = indexNode.innerWidth(),
    centerH = indexNode.innerHeight(),
    nodes = $(".node"),
    nodeCoordinates = {};
  var centerX = indexNode.offset().left + centerW / 2,
    centerY = indexNode.offset().top + centerH / 2;
  var points = {
    x: centerX,
    y: centerY,
    node: nodeCoordinates
  }
  return points;
}
