// this write the code for the shell script

// these start, finish, and step are broken up into smaller chunks for the python script
var r_start = 2.0;
var r_finish = 4.0;
var r_step = .25;

console.log("#!/bin/bash");
console.log("# This will run the python code that builds the data that is then exported to a csv file");
console.log("\n\n");

for (r = r_start; r < r_finish; r += r_step) {
	var shortenedFileName = (r.toString().length < 2 ? r.toFixed(1) : r).toString().replace(".", "_");

	console.log("python pythonBuilder.py " + r + " " + (r + r_step));
	console.log("node csvTOjson.js " + (r.toString().length < 2 ? r.toFixed(1) : r) + " > " + "theory_data/bifurcate" + shortenedFileName + ".json");

	var fullFileName = "theory_data/output" + shortenedFileName + ".csv";

	console.log("echo finished node csvTOjson bifurcate" + shortenedFileName + ".json")

	console.log("rm " + fullFileName);

	console.log("cat theory_data/bifurcate" + shortenedFileName + ".json" + " | tr \"'\" \"\\\"\" > theory_data/processedQuotes" + shortenedFileName + ".json");

	console.log("echo finished change quotes bifurcate" + shortenedFileName + ".json")

	console.log("rm " + "theory_data/bifurcate" + shortenedFileName + ".json");

	console.log("node processData.js " + (r.toString().length < 2 ? r.toFixed(1) : r) + " > " + "theory_data/processed" + shortenedFileName + ".json");

	console.log("echo finished node processData processedQuotes" + shortenedFileName + ".json");

	console.log("rm " + "theory_data/processedQuotes" + shortenedFileName + ".json");

	console.log("echo \n");
}