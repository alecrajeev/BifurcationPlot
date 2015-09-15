import csv
import json

csvfile = open("/Users/arajeev/Documents/buildData/output9.csv", "r")
jsonfile = open("/Users/arajeev/Documents/buildData/bifurcateDataFull.json", "w")

reader = csv.DictReader(csvfile)
out = json.dumps( [ row for row in reader ], indent=4 )

jsonfile.write(out)
print "Complete csv to json convert"