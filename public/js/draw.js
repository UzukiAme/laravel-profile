//draw a path in a long teardrop shape, with the large part at the "forefront"
//gradient from grey in the fore to black in the back
//no outline
//Once the path a good path is created, one will be created for each node using a loop.
var containerWidth = $(".container").width();
var containerHeight = $(".container").height();
var paper = new Raphael($(".container"), containerWidth, containerHeight);
var centerCenter = elemPoints().centerX + "," + elemPoints().centerY;
var nodeBottomCenter = elemPoints("#skills-node").nodeBottomX + "," + elemPoints("#skills-node").nodeBottomY;
paper.path("M" + centerCenter + "");
