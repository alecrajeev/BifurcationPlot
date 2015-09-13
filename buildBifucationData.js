#!usr/bin/env node

// builds the bifurcation plot data

var fs 		= require("fs"),
	csv		= require("fast-csv");

var writeableStream = fs.createWriteStream("bifurcationData.csv");

writeableStream.on("finish", function() {
	console.log("done");
});

var bifurcationData = [];

var r_start = 2.0;
	r_finish = 4.0;
	r_trials = 10,
	r_step = (r_finish - r_start)/r_trials;

function calculateBifurcationData() {
	for (i = r_start; i < r_finish; i += r_step) {
		// bifurcationData[i] = calculateDataForR(i);
		bifurcationData.push([i, calculateDataForR(i)]);
	}

	console.log(bifurcationData);
	csv.write(bifurcationData, {headers: true}).pipe(writeableStream);
}

calculateBifurcationData();

function calculateDataForR(r) {

	var singleRdata = [];

	singleRdata.push(r);
	singleRdata.push(.5); // every trial starts at .5

	for (j = 1; j < 1000; j++) {
		singleRdata[j+1] = r*singleRdata[j]*(1-singleRdata[j]);
	}

	return singleRdata;
}