import numpy as np
import scipy.signal as sc
import sys

def findMax():

	name = sys.argv[1]

	inputVoltage = name

	# skip first row because it has headers
	rawData = np.loadtxt(open(inputVoltage),delimiter=",", skiprows=1)

	singleColumn = rawData[:, 2]

	maximumArray = sc.argrelmax(singleColumn, axis=0,order=1, mode="clip")

	np.set_printoptions(formatter={'float': '{: 0.2f}'.format})

	p = np.polyfit(rawData[:,1], rawData[:, 2], 2, full=False)
	
	x = (-p[1])/(2*p[0])

	print p[0]*x*x + p[1]*x + p[2]

	# outputName = "../maximumData/" + str(inputVoltage) + ".csv"

	# np.savetxt(outputName, final_array, delimiter=",", fmt="%.2f")

	# print "finished " + outputName

def main():
	findMax()

if __name__ == '__main__':
  main()