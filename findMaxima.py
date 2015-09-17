import numpy as np


def findLocalMaxima():
	print "yo"

	data = np.loadtxt(open("./formattedData/3-65.csv","rb"), delimiter=",", skiprows=1)
	print data

def main():
	findLocalMaxima()

if __name__ == '__main__':
  main()