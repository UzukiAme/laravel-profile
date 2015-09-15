//draw a path in a long teardrop shape, with the large part at the "forefront"
//gradient from grey in the fore to black in the back
//no outline
//Once the path a good path is created, one will be created for each node using a loop.
var line;
function draw() {
  if(line) {
    line.remove();
  }
  var containerWidth = $(".container").width(),
    containerHeight = $(".container").height(),
    paper = new Raphael($(".container"), 0, containerWidth),
    centerCenter = elemPoints().centerX + " " + elemPoints().centerY,
    nodeBottomCenter = elemPoints("#skills-node").nodeBottomX + " " + elemPoints("#skills-node").nodeBottomY;
    line = paper.path("M" + centerCenter + "L" + nodeBottomCenter);
  line.attr({"stroke-width": 5, stroke: "#000", opacity: 1});
}
draw();
window.onresize = draw;
