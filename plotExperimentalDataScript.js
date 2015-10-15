var margin = {top: 50, right: 10, bottom: 60, left: 80};
var width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg") // data join
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xScale = d3.scale.linear()
	.range([0, width]);

var yScale = d3.scale.linear()
	.range([height,0]);

var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom")
	.tickSize(-height)
	.tickPadding(8)

var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left")
	.tickSize(-width)
	.tickPadding(8)

queue()
	.defer(d3.json, "./experimental_data/full_data.json")
	// .defer(d3.csv, "./formattedData2/3.7.csv")
	.await(start);

// d3.csv("./formattedData/9-9.csv", start);

function makeMyChart(err, data) {


	data.forEach(function (d) {
		d.Time = +d.Time;
		d.Voltage = +d.Voltage;
	})


	xScale.domain(d3.extent(data, function (d) {return +d.Time;	}));
	yScale.domain(d3.extent(data, function (d) {return +d.Voltage;	}));

	var dataCircle = svg.selectAll(".dataCircle")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "dataCircle")
		.attr("transform", function(d) {return "translate(" + xScale(d.Time) + ", " + yScale(d.Voltage) + ")"})
		.attr("r", "3");

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);

}

function start(err, data) {

	if (err)
		console.warn(err);

	console.log(data);

	data = data.list

	xScale.domain(d3.extent(data, function (d) {return +d[0];	}));
	yScale.domain(d3.extent(data, function (d) {return +d[1];	}));

	var dataCircle = svg.selectAll(".dataCircle")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", function (d) {
			return "dataCircle " + d[0].toString()
		})
		.attr("transform", function(d) {return "translate(" + xScale(d[0]) + ", " + yScale(d[1]) + ")"})
		.attr("r", "3");

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);

}
