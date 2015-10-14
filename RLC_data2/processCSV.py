import csv
import sys

with open(sys.argv[1],'r') as f:
	with open("../formattedData2/" + sys.argv[1],'w') as f1:
		f.next() # skip header line
		f.next()
		f.next()
		f.next()
		f.next()
		f.next()
		f.next()

		count = 0

		for line in f:
			if (count != 1):
				f1.write(line)
			count = count + 1