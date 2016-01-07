Canvas = function (dWidth, dHeight) {
  var self = this;
  var defaultWidth = dWidth;
  var defaultHeight = dHeight;
  var svg;

  var createSvg = function (width, height) {
    svg = d3.select('#canvas').append('svg')
      .attr('width', width)
      .attr('height', height);
  };

  self.createSvg = function (w, h) {
    createSvg(w, h);
  }

  // createSvg(defaultWidth, defaultHeight);

  self.clear = function () {
    d3.select('svg').remove();
    createSvg(defaultWidth, defaultHeight);
  };

  self.draw = function (data) {
    if (data.length < 1) {
      self.clear();
      return;
    }
    if (svg) {

      // Remember to format the data properly in markPoints

      // to draw a circle - 
      // svg.selectAll('circle').data(data, function(d) { return d._id; })
      // .enter().append('circle')
      // .attr('r', 10)
      // .attr('cx', function (d) { return d.x; })
      // .attr('cy', function (d) { return d.y; });

      //to draw a line
      svg.selectAll('line').data(data, function (d) {
          return d._id;
        })
        .enter().append('line')
        .attr('x1', function (d) {
          return d.x;
        })
        .attr('y1', function (d) {
          return d.y;
        })
        .attr('x2', function (d) {
          return d.x1;
        })
        .attr('y2', function (d) {
          return d.y1;
        })
        .attr("stroke-width", function (d) {
          return d.w;
        })
        .attr("stroke", function (d) {
          return d.c;
        })
        .attr("stroke-linejoin", "round");


    } // end of the if(svg) statement
  }; // end of the canvas.draw function
}; //end of the canvas function