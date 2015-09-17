//draw a path in a long teardrop shape, with the large part at the "forefront"
//gradient from grey in the fore to black in the back
//no outline
//Once the path a good path is created, one will be created for each node using a loop.
/**
* Draws node connections
* @borrows elemPoints as centerCenter, nodeBottomCenter
*/

function draw() {
  if($(".dot")) {
    $(".dot").remove();
  }
  if($(".svgwrapper")) {
    $(".svgwrapper").remove();
  }
  var nodesArray = ["#skills-node", "#center-node", "#contact-node", "#projects-node", "#references-node", "#interests-node"]
  for(i=0, l=nodesArray.length; i<l; i++) {
    var node = nodesArray[i];
    var wrapperId = $(node).attr("id") + "-svgwrapper";
    var nodeW = $(node).width();
    var nodeH = $(node).height();
    var nodeT = $(node).offset().top;
    var nodeL = $(node).offset().left;
    var centerT = $("#center-node").offset().top;
    var canvasHC = nodeW / 2;
    var canvasVC = nodeH / 2;
    var x = $(node).offset().left;
    $(node).after("<div id=\"" + wrapperId + "\" class=\"svgwrapper\"></div>");
    $("#" + wrapperId).css({
      position:"absolute",
      width:nodeW,
      height:nodeH,
      left:nodeL,
      border:"1px solid black"
    });
    var paper = new Raphael(wrapperId, nodeW, nodeH);
    if(node == "#center-node") {
      var y = nodeT;
      $("#" + wrapperId).css({top:y});
      paper.circle(canvasHC, canvasVC, 5).attr({"fill":"red", "stroke-opacity":0});
    } else {
      if(nodeT - centerT < 0) {
        var y = nodeT + nodeH;
        $("#" + wrapperId).css({top:y});
        paper.circle(canvasHC, 5, 5).attr({"fill":"red", "stroke-opacity":0});
      } else {
        var y = nodeT - nodeH;
        $("#" + wrapperId).css({top:y});
        paper.circle(canvasHC, nodeH - 5, 5).attr({"fill":"red", "stroke-opacity":0});
      }
    }
    $("svg").attr("class", "dot");
  }
}
draw();
window.onresize = draw;
