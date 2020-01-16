// //to get all mpg values from our data
// cars.map(d => d.mpg)    // or cars.map(d => d["map"])
// //D3 functions
// let minmax = d3.extent(cars.map(d => d.mpg))
// let min = d3.min(cars.map(d => d.mpg))
// let max = d3.max(cars.map(d => d.mpg))


//adding a margin to the svg
let margin = {top: 50, bottom: 50, left: 40, right: 40 };
let width = 600, height = 400;

// create svg for scatterplot to b at
d3.select("body")
  .append("svg")
  .attr("id", "scatterplot")
  .attr("width", width)
  .attr("height", height)
  .style('background-color', 'yellow')
  .style('fill', "blue");
  // .append("g")
  //   .attr('id', 'scatterplotg')
  //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//x scale is disp
let dispscale = d3.scaleLinear()
  .domain(d3.extent(cars.map(d => d.disp)))
  .range([20, 570]); //remember the brackes! input is an array. this is a little less than the size of svg
//y scale is mpg
let mpgscale = d3.scaleLinear()
  .domain(d3.extent(cars.map(d => d.mpg)))
  .range([370, 20]);

//color scale
let colorscale = d3.scaleQuantize()
  .domain(d3.extent(cars.map(d => d.cyl)))
  .range(["RebeccaPurple", "RosyBrown", "Teal", "Salmon"]);

//size scale
let sizescale = d3.scaleSqrt()
  .domain(d3.extent(cars.map(d => d.wt)))
  .range([3, 30]);

// creating circles
d3.selectAll('svg#scatterplot')
  .selectAll('circle')
  .data(cars) // include cars-data.js tho
    .enter()
    .append('circle')
      .attr('cx', d => dispscale(d.disp)) // x axis scale
      .attr('cy', d => mpgscale(d.mpg)) // y axis scale
      .attr('r', d => sizescale(d.wt)) //size scale
      .style('fill', d => colorscale(d.cyl)) //color scale
      .style('opacity', 0.7)
      .style('stroke', 'transparent');

// add axis
let xaxis = d3.axisBottom()
              .scale(dispscale);
d3.selectAll('svg#scatterplot')
  .call(xaxis);
