var margin = {top: 50, right: 10, bottom: 60, left: 80};
var width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var svg = d3.select(".graph").append("svg") // data join
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

var drawCircles = function(i) {}

queue()
	.defer(d3.json, "theory_data/processed2_0.json")
	.defer(d3.json, "theory_data/processed2_25.json")
	.defer(d3.json, "theory_data/processed2_5.json")
	.defer(d3.json, "theory_data/processed2_75.json")
	.defer(d3.json, "theory_data/processed3_0.json")
	.defer(d3.json, "theory_data/processed3_25.json")
	.defer(d3.json, "theory_data/processed3_5.json")
	.defer(d3.json, "theory_data/processed3_75.json")
	.await(makeMyChart);

function makeMyChart(err, data0, data1, data2, data3, data4, data5, data6, data7) {

	if (err)
		console.error(err);

	xScale.domain([2.0,4.0]);
	yScale.domain([0.0,1.0]);

	var xCoordinates = [];
	var xCoordinatesNames = [];

	var dataWrapper = [data0,data1,data2,data3,data4,data5,data6,data7];

	drawCircles = function(i) {

	var circleContent = svg.selectAll(".circleContent")
		.data(dataWrapper[i]);

	var circleEnter = circleContent.enter()
		.append("g")
		.attr("transform", function (d) {
			return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")";
		});
	
	circleEnter.append("circle")
		.attr("class", "circle")
		.attr("r", "5");

	var updateSelection = svg.selectAll(".circleContent")
		.transition()
		.duration(500)
		.attr("transform", function (d) {
			return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")";
		});

	updateSelection.select("circle")
		.attr("class", "circle")
		.attr("r", "5");


	}

	for (i = 0; i < 8; i++)
		drawCircles(i);

	// var updateSelection = svg.selectAll(".circle")
	// 	.transition()
	// 	.duration(500)


	// var dataCircle0 = svg.selectAll(".circle")
	// 	.data(data0)
	// 	.enter()
	// 	.append("circle")
	// 	.attr("class", "circle")
	// 	.attr("transform", function (d) {
	// 		return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"
	// 	})
	// 	.attr("r", "5");

	// var dataCircle1 = svg.selectAll(".circle")
	// 	.data(data1)
	// 	.enter()
	// 	.append("circle")
	// 	.attr("class", "circle")
	// 	.attr("transform", function (d) {
	// 		return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"
	// 	})
	// 	.attr("r", "5");

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (height) + ")")
		.call(xAxis)
		.selectAll("g")
		.selectAll("text")
		.text(function(d) {return d;	});

	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(0,0)")
		.call(yAxis)
		.selectAll("g")
		.selectAll("text")
		.text(function(d) {return d;	});

	svg.append("g")
		.attr("class", "alabel")
		.attr("transform", "translate(" + (width/2 - 80) + "," + (height + 40) + ")")
		.append("text")
		.text("r (scalable constant)");

	svg.append("g")
		.attr("class", "alabel")
		.attr("transform", "translate(" + "-50" + "," + (height/2) + ")")
		.append("text")
		.text("x");


}
