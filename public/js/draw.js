
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
  var section = windowW/(nodes.length + 2),
    containerW = section * nodes.length,
    containerH = windowH;

  container.width(containerW).height(containerH);
  $("#svg-container").width(windowW).height(containerH);

  var dimensions = {
    containerW: containerW,
    containerH: containerH,
    section: section
  }
  return dimensions;
}
var containerH = containerDimensions().containerH,
  containerW = containerDimensions().containerW,
  section = containerDimensions().section;
containerDimensions();

function createCenter() {
  if($("svg")) {
    $("svg").remove();
  }
  var paper = new Raphael("svg-container", windowW, containerH),
    radius = windowW * .1,
    outerRadius = radius + 80;
  var indexCircle = paper.circle(elemPoints().indexCenterX, elemPoints().indexCenterY, radius);
  var id = indexCircle.id;
  var circumference = Math.PI * radius * 2;
  var arc = paper.circle(elemPoints().indexCenterX, elemPoints().indexCenterY, outerRadius);

}
createCenter();

// function getArcPath(orientation) {
//   var x1, x2, x3;
//   var y1, y2, y3;
//   if(orientation == top) {
//     y1 = ;
//     y2 = ;
//     y3 = ;
//   } else if(orientation == bottom) {
//     //the bottom ones will go within a container of the same width, further along the same arc reflected to the bottom
//     y1 = ;
//     y2 = ;
//     y3 = ;
//   } else {
//     return null;
//   }
//   //set the x1 to the result of the division
//   x1 = containerDimensions().section;
//   //set x2 to right above the index node before any animaiton
//   x2 = $(indexNode).offset().left + $(indexNode).width/2;
//   //set x3 to the result of the division plus the width of the container
//   x3 = containerDimensions().section + containerDimensions().containerW;
//
//   var points = {
//     x1:x1,
//     x2:x2,
//     x3:x3,
//     y1:y1,
//     y2:y2,
//     y3:y3
//   }
//   return points;
// }



// var x1, x2, x3;
// if(nodeX < indexX) {
//   x1 =
//   x2 =
//   x3 =
// } else {
//   x1 =
//   x2 =
//   x3 =
// }
// var path = [{x:x1 , y:y1 },{x:x2 , y:y2 },{x:x3 ,y:y3}];

function recalculate() {
  windowW = $(window).width();
  windowH = $(window).height();
  containerDimensions();
  createCenter();
  containerW = containerDimensions().containerW;
  containerH = containerDimensions().containerH;
}
window.onresize = recalculate;
