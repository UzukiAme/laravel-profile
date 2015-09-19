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
  var containers = $(".svgwrapper");
  for(i=0, l=containers.length; i < l; i++) {
    var container = containers[i];
    var node = $(container).prev();
    var containerId = $(container).attr("id");
    var nodeX = elemPoints(node).nodeCenterX;
    var nodeY = elemPoints(node).nodeCenterY;
    var indexCenterX = elemPoints().indexCenterX;
    var indexCenterY = elemPoints().indexCenterY;
    var nodeW = $(node).width();
    var nodeH = $(node).height();
    var containerW = $(container).width();
    var containerH = $(container).height();
    var indexNodeH = $("#center-node").height();
    var indexNodeW = $("#center-node").width();

    var quadrant = getQuadrant(nodeX, nodeY);
    var paper = new Raphael(containerId, containerW, containerH);
    var connector, endpoints;
    switch (quadrant) {
      case "top left":
      //start: nodeHalf, #px; end: (canvasW - centerH/2), (canvasH - centerH/2)
        endpoints = {
          startX: nodeW/2,
          endX: containerW,
          endY: containerH
        }
        connector = paper.path("M" + endpoints.startX + ",10L" + endpoints.endX + "," + endpoints.endY);
        break;
      case "up":
      //start: centerCanvas, #px; end: centerCanvas, canvasH - centerH/2
        endpoints = {
          startX: containerW/2,
          endX: containerW/2,
          endY: containerH - indexCenterY/2
        }
        connector = paper.path("M" + endpoints.startX + ",10L" + endpoints.endX + "," + endpoints.endY);
        break;
      case "top right":
        // start: (canvasW - nodeHalf), #px; end: 0 + centerW/2, canvasH - centerH/2
        endpoints = {
          startX: containerW - nodeW/2,
          endX: indexNodeW/2,
          endY: containerH - indexNodeH/2
        }
        connector = paper.path("M" + endpoints.startX + ",10L" + endpoints.endX + "," + endpoints.endY);
        break;
      case "right":
      //start: canvasW - #px, centerCanvas; end: centerW/2, centerCanvas
        endpoints = {
          startX: containerW - 10,
          startY: containerH/2,
          endX: indexNodeW/2,
          endY: containerH/2
        }
        connector = paper.path("M" + endpoints.startX + "," + endpoints.startY + "L" + endpoints.endX + "," + endpoints.endY);
        break;
      case "bottom right":
        //start: canvasW - nodeHalf, canvasH - #px; end: 0 + centerW/2, 0 + centerH/2
        endpoints = {
          startX: containerW - nodeW/2,
          startY: containerH - 10,
          endX: indexNodeW/2,
          endY: indexNodeH/2
        }
        connector = paper.path("M" + endpoints.startX + "," + endpoints.startY + "L" + endpoints.endX + "," + endpoints.endY);
        break;
      case "down":
      //start: centerCanvas, canvasH - #px; end: centerCanvas, centerH/2
        endpoints = {
          startX: containerW/2,
          startY: containerH - 10,
          endX: containerW/2,
          endY: indexNodeH/2
        }
        connector = paper.path("M" + endpoints.startX + "," + endpoints.startY + "L" + endpoints.endX + "," + endpoints.endY);
        break;
      case "bottom left":
      // start: nodeHalf, canvasH - #px; end: canvasW - centerW/2, centerH/2
        endpoints = {
           startX: nodeW/2,
           startY: containerH - 10,
           endX: containerW - indexNodeW/2,
           endY: indexNodeH/2
        }
        connector = paper.path("M" + endpoints.startX + "," + endpoints.startY + "L" + endpoints.endX + "," + endpoints.endY);
        break;
      case "left":
      // start: #px, centerCanvas; end: canvasW - centerW/2, centerCanvas
        endpoints = {
          startY: containerH/2,
          endX: containerW - indexNodeW/2,
          endY: containerH/2
        }
        connector = paper.path("M10" + "," + endpoints.startY + "L" + endpoints.endX + "," + endpoints.endY);
        break;
      default:
        null;
    }
    connector.attr({"stroke":"#636363", "stroke-width":2});
  }
}

draw();
window.onresize = draw;
