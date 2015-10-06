// this will process the data to make it easier for d3 to read it

var fs = require("fs");

var inputName = "theory_data/processedQuotes" + process.argv[2].replace(".", "_") + ".json";
var outputName = "theory_data/processed" + process.argv[2].replace(".", "_") + ".json";

fs.readFile(inputName, "utf-8", function (err, data) {
	if (err)
		console.error(err);

	data = JSON.parse(data);

	// console.log(data);

	var finalData = [];

	for (key in data) {
		data[key].forEach(function (d) {
			var keyNumber = +key.toString().slice(1,-2).replace("_",".");

			// finalData.push({x: keyNumber, y: d});
			finalData.push([keyNumber,d]);
		});
	}

	console.log(finalData);

	// fs.writeFile(outputName, JSON.stringify(finalData, null,2));

	// console.log("finished node processing " + outputName);
	// console.log("\n");

});