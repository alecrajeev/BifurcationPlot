import csv
import json

csvfile = open("output.csv", "r")
jsonfile = open("bifurcateData.json", "w")

reader = csv.DictReader(csvfile)
out = json.dumps( [ row for row in reader ], indent=4 )

jsonfile.write(out)
print "Complete csv to json convert"