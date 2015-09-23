
/*
* Make a container for the nodes
* Give it a z-index of 0 and the index node 1
* Create a canvas within that container and give it a z-index of -1
* Create a circle around the index node that represents its final shape
* Create an arc that mirrors the arc of this circle for the nodes to align on
* Possibly use GSAP to get coordinates along the circle for end points for raphael drawings
* Calculate start points by the coordinates of the nodes
* Draw svg elements with calculated coordinates; Create constructor function that figures (takes?) out the coordinates for a drawing. Use that funciton to create connector objects, each with their own coordinate  concerns, rather than trying to make one function draw every path.
*/

var nodes = $(".node").not("#center-node"),
  indexNode = $("#center-node"),
  container = $(".container");
var windowW = $(window).width(),
  windowH = $(window).height();
var containerW, section;
container.width(windowW).height(windowH);

function recalculate() {
  windowW = $(window).width();
  windowH = $(window).height();
  containerDimensions();
  createCenter();
}


/**
* Divide the nodes into two arrays used to position them either above or below the index element
* @param {array} either a jquery object or an array of elements that are to be devided
* @returns {array} an array that contains the two created by the division
*/
function divideNodes(items) {
  var mod = items.length % 2,
    nodePos = 0,
    screenTop = [],
    screenBottom = [],
    half,
    t = 0,
    b = 0;

  if(mod == 1) {
    half = (items.length - 1)/2;
    for(i = 0, l = items.length; i < l; i++) {
      if(i < half + 1) {
        screenTop[t] = items[i];
        t++;
      } else {
        screenBottom[b] = items[i];
        b++;
      }
    }//end for
  } else {
    half = items.length/2;
    for(i = 0, l = items.length; i < l; i++) {
      if(i < half) {
        screenTop[t] = items[i];
        t++;
      } else {
        screenBottom[b] = items[i];
        b++;
      }
    }//end for
  }//end if mod
  var divisions = {screenTop: screenTop, screenBottom: screenBottom};
  return divisions;
}//end function
var topNodes = divideNodes(nodes).screenTop,
  bottomNodes = divideNodes(nodes).screenBottom;

function containerDimensions() {
  var section = windowW/(nodes.length + 2);

  var dimensions = {section:section};
  return dimensions;
}
containerDimensions();
var section = containerDimensions().section;

//Place elements on side arc that begins at a constant y value and ends at a y value that is the height of the window minus a constant value. This way, the arc will expand and shrink with the height of the window. The x coordinates should be a percentage of the window width in typical responsive fashion. At the break point (tbt), the orientation of the nodes will rotate 90 degrees

function createCenter() {
  if($("svg")) {
    $("svg").remove();
  }
  var paper = new Raphael("svg-container", windowW, windowH),
    radius = windowW * .1,
    circumference = Math.PI * radius * 2;
  var indexCircle = paper.circle(elemPoints().indexCenterX, elemPoints().indexCenterY, radius);
}
createCenter();
console.log(section);


window.onresize = recalculate;
