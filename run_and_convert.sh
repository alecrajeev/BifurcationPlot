#!/bin/bash
# This will run the python code that builds the data that is then exported to a csv file



python pythonBuilder.py 2 2.25
node csvTOjson.js 2.0 > theory_data/bifurcate2_0.json
echo finished node csvTOjson bifurcate2_0.json
rm theory_data/output2_0.csv
cat theory_data/bifurcate2_0.json | tr "'" "\"" > theory_data/processedQuotes2_0.json
echo finished change quotes bifurcate2_0.json
rm theory_data/bifurcate2_0.json
node processData.js 2.0 > theory_data/processed2_0.json
echo finished node processData processedQuotes2_0.json
rm theory_data/processedQuotes2_0.json
echo 

python pythonBuilder.py 2.25 2.5
node csvTOjson.js 2.25 > theory_data/bifurcate2_25.json
echo finished node csvTOjson bifurcate2_25.json
rm theory_data/output2_25.csv
cat theory_data/bifurcate2_25.json | tr "'" "\"" > theory_data/processedQuotes2_25.json
echo finished change quotes bifurcate2_25.json
rm theory_data/bifurcate2_25.json
node processData.js 2.25 > theory_data/processed2_25.json
echo finished node processData processedQuotes2_25.json
rm theory_data/processedQuotes2_25.json
echo 

python pythonBuilder.py 2.5 2.75
node csvTOjson.js 2.5 > theory_data/bifurcate2_5.json
echo finished node csvTOjson bifurcate2_5.json
rm theory_data/output2_5.csv
cat theory_data/bifurcate2_5.json | tr "'" "\"" > theory_data/processedQuotes2_5.json
echo finished change quotes bifurcate2_5.json
rm theory_data/bifurcate2_5.json
node processData.js 2.5 > theory_data/processed2_5.json
echo finished node processData processedQuotes2_5.json
rm theory_data/processedQuotes2_5.json
echo 

python pythonBuilder.py 2.75 3
node csvTOjson.js 2.75 > theory_data/bifurcate2_75.json
echo finished node csvTOjson bifurcate2_75.json
rm theory_data/output2_75.csv
cat theory_data/bifurcate2_75.json | tr "'" "\"" > theory_data/processedQuotes2_75.json
echo finished change quotes bifurcate2_75.json
rm theory_data/bifurcate2_75.json
node processData.js 2.75 > theory_data/processed2_75.json
echo finished node processData processedQuotes2_75.json
rm theory_data/processedQuotes2_75.json
echo 

python pythonBuilder.py 3 3.25
node csvTOjson.js 3.0 > theory_data/bifurcate3_0.json
echo finished node csvTOjson bifurcate3_0.json
rm theory_data/output3_0.csv
cat theory_data/bifurcate3_0.json | tr "'" "\"" > theory_data/processedQuotes3_0.json
echo finished change quotes bifurcate3_0.json
rm theory_data/bifurcate3_0.json
node processData.js 3.0 > theory_data/processed3_0.json
echo finished node processData processedQuotes3_0.json
rm theory_data/processedQuotes3_0.json
echo 

python pythonBuilder.py 3.25 3.5
node csvTOjson.js 3.25 > theory_data/bifurcate3_25.json
echo finished node csvTOjson bifurcate3_25.json
rm theory_data/output3_25.csv
cat theory_data/bifurcate3_25.json | tr "'" "\"" > theory_data/processedQuotes3_25.json
echo finished change quotes bifurcate3_25.json
rm theory_data/bifurcate3_25.json
node processData.js 3.25 > theory_data/processed3_25.json
echo finished node processData processedQuotes3_25.json
rm theory_data/processedQuotes3_25.json
echo 

python pythonBuilder.py 3.5 3.75
node csvTOjson.js 3.5 > theory_data/bifurcate3_5.json
echo finished node csvTOjson bifurcate3_5.json
rm theory_data/output3_5.csv
cat theory_data/bifurcate3_5.json | tr "'" "\"" > theory_data/processedQuotes3_5.json
echo finished change quotes bifurcate3_5.json
rm theory_data/bifurcate3_5.json
node processData.js 3.5 > theory_data/processed3_5.json
echo finished node processData processedQuotes3_5.json
rm theory_data/processedQuotes3_5.json
echo 

python pythonBuilder.py 3.75 4
node csvTOjson.js 3.75 > theory_data/bifurcate3_75.json
echo finished node csvTOjson bifurcate3_75.json
rm theory_data/output3_75.csv
cat theory_data/bifurcate3_75.json | tr "'" "\"" > theory_data/processedQuotes3_75.json
echo finished change quotes bifurcate3_75.json
rm theory_data/bifurcate3_75.json
node processData.js 3.75 > theory_data/processed3_75.json
echo finished node processData processedQuotes3_75.json
rm theory_data/processedQuotes3_75.json
echo 

