var fill = d3.scale.category20b();
var w = 700,
    h = 400;
var max,fontSize;

var layout = d3.layout.cloud()
        .timeInterval(Infinity)
        .size([w, h])
        .fontSize(function(d) {
            return fontSize(+d.value);
        })
        .text(function(d) {
            return d.key;
        })
        .on("end", draw);

var svg = d3.select("#wordCloud").append("svg")
        .attr("width", w)
        .attr("height", h);

var vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");
function draw(data, bounds) {

  var w = document.getElementById('wordCloudContainer').offsetWidth,
      h = document.getElementById('wordCloudContainer').offsetHeight;

  svg.attr("width", w).attr("height", h);

  scale = bounds ? Math.min(
          w / Math.abs(bounds[1].x - w / 2),
          w / Math.abs(bounds[0].x - w / 2),
          h / Math.abs(bounds[1].y - h / 2),
          h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

  var text = vis.selectAll("text")
          .data(data, function(d) {
              return d.text.toLowerCase();
          });
  text.transition()
          .duration(1000)
          .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")";
          })
          .style("font-size", function(d) {
              return d.size + "px";
          });
  text.enter().append("text")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")";
          })
          .style("font-size", function(d) {
              return d.size + "px";
          })
          .style("opacity", 1e-6)
          .transition()
          .duration(1000)
          .style("opacity", 1);
  text.style("font-family", function(d) {
      return d.font;
  })
          .style("fill", function(d) {
              return fill(d.text.toLowerCase());
          })
          .text(function(d) {
              return d.text;
          });

  vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
}

function update() {
  layout.font('impact');
  fontSize = d3.scale['sqrt']().range([10, 100]);

  var w = document.getElementById('wordCloudContainer').offsetWidth,
      h = document.getElementById('wordCloudContainer').offsetHeight;
  var wordLength = parseInt(w * h / 10000);

  var maxWord = tags.length;

  if(tags.length > wordLength)
    maxWord = wordLength;

  console.log("maxWord", maxWord);
  var words = tags.slice(0, maxWord);


  if (tags.length){
    fontSize.domain([+words[words.length - 1].value || 1, +words[0].value]);
  }
  layout.stop().words(words).start();
}


var tags = [];
$(function() {
  var id = $("#wordCloud").data("id");


  $.ajax({
    url: "/api/labfnp/recipe/"+id+"/feelings",
    method: "GET",
    dataType: 'json',
    cache: false
  }).done(function(result) {
    console.log(result);
    tags = result.data.feelings
    update();
  });



  window.onresize = function(event) {
    update();
  };
});
