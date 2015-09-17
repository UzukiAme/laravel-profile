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

var height = $(window).height() - 40;
var width = $(window).width() - $("#center-node a").width();
$("#skills-node").click(function() {
  var tl = new TimelineMax();
  tl.to($("#center-node"), 3, {top:height, left:width, ease:Back.easeOut},"svg")
  .to($("svg"), 3, {top:"10px", height:"20px", width:"20px"},"svg")
  .to($("circle"), 3, {attr:{cx:10, cy:10}}, "svg");
});

// $("#skills-node").click(function() {
//   var nodeL = $(this).offset().left;
//   var nodeT = $(this).offset().top;
//   var centerL = $("#center-node").offset().left;
//   var centerT = $("#center-node").offset().top;
//   TweenMax().to($(this), 1, {top:"50%", left:"50%", xPercent:-50, yPercent:-50, ease:Back.easeOut});
//   if (nodeT < centerT) {
//     if (nodeL < centerL) {
//       TweenMax.to($("#center-node"), 1.2, {right:"40px", bottom:"40px", ease:Back.easeOut});
//     } else {
//       TweenMax.to($("#center-node"), 1.2, {left:"40px", bottom:"40px", ease:Back.easeOut});
//     }
//   } else {
//     if(nodeL < centerL) {
//       TweenMax.to($("#center-node"), 1.2, {top:"40px", right:"40px", ease:Back.easeOut});
//     } else {
//       TweenMax.to($("#center-node"), 1.2, {top:"40px", left:"40px", ease:Back.easeOut});
//     }
//   }
// });
