var containerW = $(".container").width();
var containerH = $(".container").height();

//center with TweenMax to help with browser compatability
TweenMax.set($("#center-node"), {
  xPercent: -50,
  yPercent: -50
});

/**
* Get the x and y coordinates of start and end points for the connecting lines.
* @returns {array} x and y coordinates for the center, and the node's bottom
*  center. If there is no node entered, the element coordinates will default to 0, 0
* @param {string} [node] the id of the node the points are being calculated on.
*/
function elemPoints(node) {
  //get the dimensions of the title element and the center element
  var center = $("#center-node"),
    node = $(node) || undefined;
    elemW = node.outerWidth() || 0,
    elemH = node.outerHeight() || 0,
    centerW = center.innerWidth(),
    centerH = center.innerHeight(),
  //get the x and y coordinates of the node and center
    elemCoords = node.offset() || 0,
    centerCoords = center.offset();
  //find center node's center coordinates
  var centerX = centerCoords.left + centerW / 2,
    centerY = centerCoords.top + centerH / 2;
  //find center node's bottom center coordinates.
  var nodeBottomX = elemCoords.left + elemW / 2 || 0,
    nodeBottomY = elemCoords.top + elemH || 0;

  var points = {
    centerX: centerX,
    centerY: centerY,
    nodeBottomX: nodeBottomX,
    nodeBottomY: nodeBottomY
  };

  return points;
}
