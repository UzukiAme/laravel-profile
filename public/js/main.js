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
