var margin = {top: 20, right: 10, bottom: 50, left: 80};
var width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

// var svg = d3.select("body").append("svg") // data join
// 	.attr("width", width + margin.left + margin.right)
// 	.attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

var X = [];

var finalArray = [];

var r = 2.0;

var rNumber = 200;


function calcR() {

	for (j = 0; j < rNumber; j++) {
		X[j] = fCalc(getrfromindex(j));
	}

	return X;
}

function fCalc(r) {

	var Y = [];

	Y.push(.5);

	for (i = 0; i < 1000; i++) {
		Y[i+1] = r*Y[i]*(1-Y[i]);
		// console.log(X[i+1]);
	}

	return Y;
}

function getrfromindex(i) {
	return (r + (i/100));
}

function start3(data) {

	var svg = d3.select("body").append("svg") // data join
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
  		.append("g")
  		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	xScale.domain([2.0,4.0]);
	yScale.domain([0.0, 1.0]);

	var data2 = [];

	for (i = 0; i < rNumber; i++) {
		for (j = 0; j < 190; j++)
			data2.push([i, data[i][800+j]])
	}

	var circle = svg.selectAll("circle")
		.data(data2)
		.enter()
		.append("circle")
		.attr("class", "circle")
		.attr("transform", function(d) {return "translate(" + xScale(d[0]/(.5*rNumber) + 2.0) + "," + yScale(d[1]) + ")"; })
		.attr("r", 2)

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

function start2(data) {

	// console.log(data);

	var divs = d3.selectAll("div")
		.data(data)
		.enter()
		.append("div")

	divs.append("h3")
		.text(function(d, i) {return "r = " + getrfromindex(i);	});

	var svg = divs.append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	xScale.domain([0, data[0].length - 1]);
	yScale.domain([0, 1.0]);


	var circle = svg.selectAll("circle")
		.data(function(d) {return d})
		.enter()
		.append("circle")
		.attr("class", "circle")
		.attr("transform", function(d, i) {return "translate(" + xScale(i) + "," + yScale(d) + ")"; })
		.attr("r", 2)

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

d3.json("bifurcateData.json", start);

function start(err, data) {

	if (err)
		console.error(err)

	console.log(data)

	// console.log(data);

	var svg = d3.select("body").append("svg") // data join
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
  		.append("g")
  		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  	// console.log(data[0]);

  	data.forEach(function (d) { // will eventually do this in node
  		// console.log(d);
  		d.array_data = [];
  		var i = 0;
  		for (var prop in d) {
  			if (i++ < 20) { // prevents the array from being added to array. since d.array_data is last property
  				d.array_data.push(d[prop])
  			}
  		}
  	})

  	// this needs to be done in node as well
  	r_array = []; // array with every r value
  	for (var prop in data[110]) {
  		r_array.push(+prop);
  		console.log(+prop)
  		console.log(data[110][prop]);
  	}

	xScale.domain(d3.extent(r_array));
	yScale.domain([0, 1]);

	var circle = svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "circle")
		.attr("transform", function (d) {
			return "translate(" + xScale(2.0) + "," + yScale(d.array_data[0]) + ")";
		})
		.attr("r", 5)

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (height) + ")")
		.call(xAxis)
		.selectAll("g")
		.selectAll("text")
		.text(function(d) {console.log(d); return d;	});

	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(0,0)")
		.call(yAxis)
		.selectAll("g")
		.selectAll("text")
		.text(function(d) {console.log(d); return d;	});

}


function calcD() {

	var A = [];
	A.push(.75);
	A.push(1.25);
	A.push(1.3680989);
	A.push(1.3940462);
	A.push(1.3996312);
	
	var n = A.length - 1; // the minus 1 is because Array's index at 0

	var d; // feigengbaum consant

	for (i = 2; i <= n; i++) {
		d = (A[i-1] - A[i-2])/(A[i]-A[i-1]);
		// console.log(d);
	}

	// d = (A[n-1] - A[n-2])/(A[n]-A[n-1])

	return d;
}