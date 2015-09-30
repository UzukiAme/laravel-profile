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
  switch (angle) {
    case angle < 0 && angle > 90:
      return "bottom-left";
      break;
    case angle < 0 && angle < 90:
      return "bottom-right";
      break;
    case angle > 0 && angle < 90:
      return "top-left";
      break;
    case angle > 0 && angle > 90:
      return "top-right";
      break;
    case angle == 0:
      return "left";
      break;
    case angle == 90:
      return "up";
      break;
    case angle == 180:
      return "right";
      break;
    case angle == -90:
      return "down";
      break;
    default:
      return null;
      break;
  }
}

/**
* Get the coordinates that create the line on the side of a node that faces the
*   index at any gived position within the window, or all four corners if no quadrant is given
* @param {string} the quadrant descriptor from the above quadrant function
* @param {object} jQuery object for the node in question
* @returns {object} either coordinates for all four corners or coordinates for the side that faces the index
*/
function getNodeCorners(quadrant, node) {
  var quadrant = quadrant || null,
    node = $(node),
    top = node.offset().top,
    left = node.offset().left,
    coordinates = {
      tl:{x:left, y:top},
      tr:{x:left + width, y:top},
      bl:{x:left, y:top + height},
      br:{x:left + width, y:top + height}
    };
  if(quadrant != null) {
    switch(quadrant) {
      case "top-left" || "up" || "top-right":
        return [coordinates.bl, coordinates.br];
        break;
      case "right":
        return [coordinates.tl, coordinates.bl];
        break;
      case "bottom-right" || "down" || "bottom-left":
        return [coordinates.tl, coordinates.tr];
        break;
      case "left":
        return [coordinates.tr, coordinates.br];
        break;
      default:
        return null;
        break;
    } else {
      return coordinates;
    }
  }
}

/**
* Get the x and y coordinates, relative to the window, of the center of the index node.
*   Currently this funcion only gets one point. However, I anticipate needing to include other
*   points in the future. So the name will remain the same.
* @returns {array} x and y coordinates for the index.
*/
function center() {
  //get the dimensions of the title element and the center element
  var indexNode = $("#center"),
    centerW = indexNode.innerWidth(),
    centerH = indexNode.innerHeight(),
    nodes = $(".node"),
    nodeCoordinates = {};
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
