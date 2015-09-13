var margin = {top: 20, right: 10, bottom: 50, left: 80};
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


var line = d3.svg.line()
	.x(function(d) {return xScale(d);	})
	.y(function(d) {return yScale(d);	});

d3.json("bifurcateData.json", start);

function start(err, data) {

	if (err)
		console.error(err)

  	// this needs to be done in node as well
  	r_array = []; // array with every r value
  	for (var prop in data[110]) {
  		r_array.push(+prop);
  		console.log(prop);
  	}

  	data.forEach(function (d) { // will eventually do this in node
  		d.array_data = [];
  		var i = 0;
  		for (var prop in d) {
  			if (i++ < 20) { // prevents the array from being added to array. since d.array_data is last property
  				d.array_data.push(d[prop])
  			}
  		}
  	})

	xScale.domain(d3.extent(r_array));
	yScale.domain([0, 1]);

	var circle = svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "circle")
		.attr("transform", function (d) {
			n = 0;
			console.log(r_array[n]);
			return "translate(" + xScale(r_array[n]) + "," + yScale(d.array_data[n]) + ")";
		})
		.attr("r", 5)


	// idea is to add the other 18 data points using d3's update ability

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

}