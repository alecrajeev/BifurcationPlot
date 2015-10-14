#!usr/bin/env node


var fs = require("fs");

fs.readFile("list_csv.json", "utf-8", function(err, data) {
	if (err)
		console.error(err);

	data = JSON.parse(data);

	data.list.forEach(function (d) {
		console.log("python " + "findPeaks.py " + d);
	});
})