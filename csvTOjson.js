// this will convert the csv data to a json file
// file is named after its first r value

var Converter = require("csvtojson").Converter,
	fs 		  = require("fs"),
	assert    = require("assert");

var inputName = "output" + process.argv[2].replace(".", "_") + ".csv";
var outputName = "bifurcate" + process.argv[2].replace(".", "_") + ".json";

var csvConverter = new Converter({
	constructResult: true,
}); // The parameter false will turn off final result construction. It can avoid huge memory consumption while parsing. The trade off is final result will not be populated to end_parsed event. 

var readStream = fs.createReadStream(inputName);
var result = {};
var csvConverter = new Converter();
//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed", function () {
	
	// console.log(result);
	// console.log(JSON.stringify(result, null, 3));
	
	fs.writeFile(outputName, JSON.stringify(result, null, 3), function (err) {
		if (err)
			console.error(err);
		console.log("finished node convert " + outputName);
	});
});

//record_parsed will be emitted each time a row has been parsed. 
csvConverter.on("record_parsed", function(resultRow, rawRow, rowIndex) {

    for (var key in resultRow) {
        if (!result[key] || !result[key] instanceof Array) {
            result[key] = [];
        }
        result[key][rowIndex] = resultRow[key];
    }
 
});
readStream.pipe(csvConverter);