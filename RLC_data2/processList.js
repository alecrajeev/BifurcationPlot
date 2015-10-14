#!usr/bin/env node


var fs = require("fs");

fs.readFile("list_data.json", "utf-8", function(err, data) {
	if (err)
		console.error(err);

	var data2 = JSON.parse(data);

	data2.list.forEach(function (d) {
		console.log("python " + "xlsxTOcsv.py " + d + " > " + d.slice(0,-4) + ".csv");
	});
})