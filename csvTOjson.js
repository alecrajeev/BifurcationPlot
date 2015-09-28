var Converter = require("csvtojson").Converter,
	fs 		  = require("fs"),
	assert    = require("assert");

var csvConverter = new Converter({
	constructResult: false,
}); // The parameter false will turn off final result construction. It can avoid huge memory consumption while parsing. The trade off is final result will not be populated to end_parsed event. 
 
// var readStream=require("fs").createReadStream("output7.csv");
 
// var writeStream=require("fs").createWriteStream("output7_parsed.json");
 
// readStream.pipe(csvConverter).pipe(writeStream);

var readStream = fs.createReadStream("output7.csv");
var result = {};
var csvConverter = new Converter();
//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed", function () {
	// console.log(result);
	// console.log(JSON.stringify(result, null, 3));
	fs.writeFile("output7_parsed.json", JSON.stringify(result, null, 3), function (err) {
		if (err)
			console.error(err);
		console.log("It's saved");
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