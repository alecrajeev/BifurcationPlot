#!usr/bin/env node

// processes the bifurcation plot data
// puts data from object to an array

var fs = require("fs");

fs.readFile("bifurcateData.json", "utf-8", function (err, bifurcateData) {
		if (err)
			console.error(err);

		var bdata = JSON.parse(bifurcateData); // parses the data so node can understand it

		// console.log(bdata[0]);

		var r_array = [];

		for (var prop in bdata[0])
			r_array.push(+prop);

		bdata.forEach(function (d) {

			d.data_array = [];

			var i = 0;
			for (var prop in d) {
				if (i++ < (r_array.length)) {
					d.data_array.push(+d[prop]);
					delete d[prop];
				}
			}
		});

		var R_array_object = {};
		R_array_object.first = r_array;

		// outputs the data so that each r has its own array. makes it easier to traverse
		// also converts strings to numbers
		fs.writeFile("bifurcateDataProcessed.json", JSON.stringify(bdata, null, 4)); 
		
		// outputs the r_array so the browser knows the x-axis input		
		fs.writeFile("r_array.json", JSON.stringify(R_array_object, null, 4));
});