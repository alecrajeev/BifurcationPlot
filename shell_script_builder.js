// this write the code for the shell script

// these start, finish, and step are broken up into smaller chunks for the python script
var r_start = 2.0;
var r_finish = 4.0;
var r_step = .25;

console.log("#!/bin/bash");
console.log("# This will run the python code that builds the data that is then exported to a csv file");
console.log("\n\n");

for (r = r_start; r < r_finish; r += r_step) {
	console.log("python pythonBuilder.py " + r + " " + (r + r_step));
	console.log("node csvTOjson.js " + (r.toString().length < 2 ? r.toFixed(1) : r));

	var shortenedFileName = (r.toString().length < 2 ? r.toFixed(1) : r).toString();

	var fullFileName = "theory_data/output" + shortenedFileName.replace(".", "_") + ".csv";

	console.log("rm " + fullFileName);

	console.log("node processData.js " + (r.toString().length < 2 ? r.toFixed(1) : r));

	console.log("rm " + "theory_data/bifurcate" + shortenedFileName.replace(".","_") + ".json");
	console.log("\n");
}