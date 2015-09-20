
/*
Make a container for the nodes
Give it a z-index of 0 and the index node 1
Create a canvas within that container and give it a z-index of -1
Create a circle around the index node that represents its final shape
Create an arc that mirrors the arc of this circle for the nodes to align on
Possibly use GSAP to get coordinates along the circle for end points for raphael drawings
Calculate start points by the coordinates of the nodes
Draw svg elements with calculated coordinates
*/

/**
* Divide the nodes into two arrays used to position them either above or below the index element
* @param {array} either a jquery object or an array of elements that are to be devided
* @returns {array} an array that contains the two created by the division
*/
function divideNodes(nodes) {
  var mod = nodes.length % 2,
    nodePos = 0,
    screenTop = [],
    screenBottom = [],
    half,
    t = 0,
    b = 0;

  if(mod == 1) {
    half = (nodes.length - 1)/2;
    for(i = 0, l = nodes.length; i < l; i++) {
      if(i < half + 1) {
        screenTop[t] = nodes[i];
        t++;
      } else {
        screenBottom[b] = nodes[i];
        b++;
      }
    }//end for
  } else {
    half = nodes.length/2;
    for(i = 0, l = nodes.length; i < l; i++) {
      if(i < half) {
        screenTop[t] = nodes[i];
        t++;
      } else {
        screenBottom[b] = nodes[i];
        b++;
      }
    }//end for
  }//end if mod
  var divisions = {screenTop: screenTop, screenBottom: screenBottom};
  return divisions;
}//end function

function getPath(orientation) {
  //divide the width of the screen by the length of the top array + 2
  var nodes = $(".node").not("#center-node");
  var width = $(window).width();
  var topNodes = divideNodes(nodes).screenTop;
  var bottomNodes = divideNodes(nodes).screenBottom;
  var section = width/(divideNodes(nodes).screenTop.length + 2);
  //multiply the result by the number of items in the top array to get the width of the area that will contain the nodes.
  var containerW = section * topNodes.length;
  var x1, x2, x3;
  var y1, y2, y3;
  if(orientation == top) {
    y1 = ;
    y2 = ;
    y3 = ;
  } else if(orientation == bottom) {
    //the bottom ones will go within a container of the same width, further along the same arc reflected to the bottom
    y1 = ;
    y2 = ;
    y3 = ;
  } else {
    return null;
  }
  //set the x1 to the result of the division
  x1 = section;
  //set x2 to right above the index node before any animaiton
  x2 = $("#center-node").offset().left + $("#center-node").innerWidth/2;
  //set x3 to the result of the division plus the width of the container
  x3 = section + containerW;

  var points = {
    x1:x1,
    x2:x2,
    x3:x3,
    y1:y1,
    y2:y2,
    y3:y3
  }
  return points;
}

/*example code from codepen*/
var quantity = $(".node").not("#center-node").length, duration = 3,
path = [{x:40, y:200},{x:600, y:40},{x:1200, y:200}],
position = {x:path[0].x, y:[path[0].y], rotation:0},
tween = TweenMax.to(position, quantity, {bezier:{type:"through",values:path,autoRotate:false}, ease:Linear.easeNone}),
tl = new TimelineMax(),
i, dot;
path.shift();
for (i = 0; i < quantity; i++) {
		 tween.time(i);
     dot = $("<div />", {id:"dot"+i}).addClass("dot").appendTo("body");
     TweenLite.set(dot, {x:position.x,y:position.y,rotation:position.rotation});
		 tl.set(dot, {visibility:"visible"}, i * (duration / quantity))
     .to(dot,3, {backgroundColor:"red"}, i * (duration / quantity));
}

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
