#!/bin/bash
# This will run the python code that builds the data that is then exported to a csv file



python pythonBuilder.py 2 2.25
node csvTOjson.js 2.0
rm theory_data/output2_0.csv
node processData.js 2.0
rm theory_data/bifurcate2_0.json


python pythonBuilder.py 2.25 2.5
node csvTOjson.js 2.25
rm theory_data/output2_25.csv
node processData.js 2.25
rm theory_data/bifurcate2_25.json


python pythonBuilder.py 2.5 2.75
node csvTOjson.js 2.5
rm theory_data/output2_5.csv
node processData.js 2.5
rm theory_data/bifurcate2_5.json


python pythonBuilder.py 2.75 3
node csvTOjson.js 2.75
rm theory_data/output2_75.csv
node processData.js 2.75
rm theory_data/bifurcate2_75.json


python pythonBuilder.py 3 3.25
node csvTOjson.js 3.0
rm theory_data/output3_0.csv
node processData.js 3.0
rm theory_data/bifurcate3_0.json


python pythonBuilder.py 3.25 3.5
node csvTOjson.js 3.25
rm theory_data/output3_25.csv
node processData.js 3.25
rm theory_data/bifurcate3_25.json


python pythonBuilder.py 3.5 3.75
node csvTOjson.js 3.5
rm theory_data/output3_5.csv
node processData.js 3.5
rm theory_data/bifurcate3_5.json


python pythonBuilder.py 3.75 4
node csvTOjson.js 3.75
rm theory_data/output3_75.csv
node processData.js 3.75
rm theory_data/bifurcate3_75.json


