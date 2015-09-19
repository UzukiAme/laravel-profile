/**
* Creates a container for each given node in which the svg drawings will reside
* @param {array || jquery object} all the nodes after wich an svg container shold be created
* @borrows elemPoints
*/

function createContainers(nodes) {
  // var nodesArray = ["#skills-node", "#center-node", "#contact-node", "#projects-node", "#references-node", "#interests-node"]
  for(i=0, l=nodes.length; i<l; i++) {
    var node = nodes[i];
    var wrapperId = $(node).attr("id") + "-svgwrapper";
    var nodeW = $(node).width();
    var nodeH = $(node).height();
    var nodeT = $(node).offset().top;
    var nodeL = $(node).offset().left;
    var yDifference = elemPoints(node).nodeCenterY - elemPoints().indexCenterY;
    var xDifference = elemPoints(node).nodeCenterX - elemPoints().indexCenterX;
    $(node).after("<div id=\"" + wrapperId + "\" class=\"svgwrapper\"></div>");
    $("#" + wrapperId).css({
      position:"absolute",
      width: function() {
        if(xDifference < 0) {
          //left
          return elemPoints(node).indexCenterX - nodeL;
        } else if(elemPoints(node).nodeCenterX == elemPoints(node).indexCenterX) {
          return nodeW;
        } else {
          return nodeL - elemPoints(node).indexCenterX + nodeW;
        }
      },
      left: function () {
        if(xDifference < 0) {
          return nodeL;
        } else if(elemPoints(node).nodeCenterX == elemPoints(node).indexCenterX) {
          return nodeL;
        } else {
          return elemPoints(node).indexCenterX;
        }
      },
      height:function() {
        if(yDifference < 0) {
          //above
          return elemPoints(node).indexCenterY - (nodeT + nodeH);
        } else {
          return nodeT - elemPoints(node).indexCenterY;
        }
      },
      top: function() {
        if(yDifference < 0) {
          return nodeT + nodeH;
        } else {
          return elemPoints(node).indexCenterY;
        }
      },
      border:"1px solid black"
    });
    if(node == "#center-node") {
      $("#" + wrapperId).remove();
    }
  }
}

/**
* Draws node connections
*
*/
function draw() {
  if($(".svgwrapper")) {
    $(".svgwrapper").remove();
  }
  createContainers($(".node").not("#center-node"));

}

draw();
window.onresize = draw;
