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

var lineten = d3.svg.line()
	.x(function(d) {return xScale(d.frequency);	})
	.defined(function(d) {return d.ten > .01;	})
	.y(function(d) {return yScale(d.ten);	});

var linetwelve = d3.svg.line()
	.x(function(d) {return xScale(d.frequency);	})
	.defined(function(d) {return d.twelve > .01;	})
	.y(function(d) {return yScale(d.twelve);	});

var linefourteen = d3.svg.line()
	.x(function(d) {return xScale(d.frequency);	})
	.defined(function(d) {return d.fourteen > .01;	})
	.y(function(d) {return yScale(d.fourteen);	});

var linesixteen = d3.svg.line()
	.x(function(d) {return xScale(d.frequency);	})
	.defined(function(d) {return d.sixteen > .01;	})
	.y(function(d) {return yScale(d.sixteen);	});		

d3.csv("source.csv", start3);

function start3(err, data) {

	if (err)
		console.warn(err);

	yScale.domain([0,12]);
	xScale.domain([27,123]);

	var tenHenry = svg.selectAll("tenHenry")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "tenHenry")
		.attr("transform", function(d) {return "translate(" + xScale(d.frequency) + "," + yScale(d.ten) + ")"; })
		.attr("r", function(d) { // gets rid of points that don't have data points
			if (d.ten > 0)
				return 5;
			else
				return 0;
		});

	svg.append("path")
    	.datum(data)
    	.attr("class", "line")
    	.attr("d", lineten);

	svg.append("path")
    	.datum(data)
    	.attr("class", "line")
    	.attr("d", linetwelve);
    
	svg.append("path")
    	.datum(data)
    	.attr("class", "line")
    	.attr("d", linefourteen);      

	svg.append("path")
    	.datum(data)
    	.attr("class", "line")
    	.attr("d", linesixteen);

	var twelveHenry = svg.selectAll("twelveHenry")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "twelveHenry")
		.attr("transform", function(d) {return "translate(" + xScale(d.frequency) + "," + yScale(d.twelve) + ")"; })
		.attr("r", function(d) { // gets rid of points that don't have data points
			if (d.twelve > 0)
				return 5;
			else
				return 0;
		})

	var fourteenHenry = svg.selectAll("fourteenHenry")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "fourteenHenry")
		.attr("transform", function(d) {return "translate(" + xScale(d.frequency) + "," + yScale(d.fourteen) + ")"; })
		.attr("r", function(d) { // gets rid of points that don't have data points
			if (d.fourteen > 0)
				return 5;
			else
				return 0;
		})

	var sixteenHenry = svg.selectAll("sixteenHenry")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "sixteenHenry")
		.attr("transform", function(d) {
			if (d.sixteen > .01)
				return "translate(" + xScale(d.frequency) + "," + yScale(d.sixteen) + ")"; })
		.attr("r", function(d) { // gets rid of points that don't have data points

			if (d.sixteen > 0)
				return 5;
			else
				return 0;
		})	

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
		.text("Frequency (kHz)");

	svg.append("g")
		.attr("class", "alabel")
		.attr("transform", "translate(" + "-30" + "," + (height/2) + ")")
		.append("text")
		.attr("transform", "rotate(-90)")
		.text("Input Voltage (Volts)");

	svg.append("g")
		.attr("class", "chartTitle")
		.attr("transform", "translate(" + "280" + "," + "-20" + ")")
		.append("text")
		.text("Frequency Optimization");

	// add legend   
	var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("x", width - 65)
	  .attr("y", 25)
	  .attr("height", 100)
	  .attr("width", 100)

	legend.selectAll("g").data([0,1,2,3])
      .enter()
      .append('g')
      .each(function(d, i) {
        var g = d3.select(this);
        g.append("rect")
          .attr("x", width - 65)
          .attr("y", i*25)
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", function(d) {
          	switch(i) {
          		case 0:
          			return "blue";
          			break;
          		case 1:
          			return "red";
          			break;
          		case 2:
          			return "green";
          			break;
          		case 3:
          			return "purple";
          			break;
          	}
          });
        
        g.append("text")
          .attr("x", width - 50)
          .attr("y", i * 25 + 8)
          .attr("height",30)
          .attr("width",100)
          .text(function(d) {
          	switch(i) {
          		case 0:
          			return "10 (mH)";
          			break;
          		case 1:
          			return "12 (mH)";
          			break;
          		case 2:
          			return "14 (mH)";
          			break;
          		case 3:
          			return "16 (mH)";
          			break;
          	}
          });
      })
}
