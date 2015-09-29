#!/bin/bash
# This will run the python code that builds the data that is then exported to a csv file



python pythonBuilder.py 2 2.25
node csvTOjson.js 2.0
python pythonBuilder.py 2.25 2.5
node csvTOjson.js 2.25
python pythonBuilder.py 2.5 2.75
node csvTOjson.js 2.5
python pythonBuilder.py 2.75 3
node csvTOjson.js 2.75
python pythonBuilder.py 3 3.25
node csvTOjson.js 3.0
python pythonBuilder.py 3.25 3.5
node csvTOjson.js 3.25
python pythonBuilder.py 3.5 3.75
node csvTOjson.js 3.5
python pythonBuilder.py 3.75 4
node csvTOjson.js 3.75
