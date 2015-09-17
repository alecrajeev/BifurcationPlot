import csv
import sys

with open(sys.argv[1],'r') as f:
	with open(sys.argv[1][:-4] + "_updated.csv",'w') as f1:
		f.next() # skip header line
		f.next()
		for line in f:
			f1.write(line)