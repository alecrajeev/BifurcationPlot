import numpy as np
import scipy.signal as sc
import sys

def findMax():

	name = sys.argv[1]

	inputVoltage = name

	rawData = np.loadtxt(open(inputVoltage),delimiter=",", skiprows=1)

	singleColumn = rawData[:, 2]

	maximumArray = sc.argrelmax(singleColumn, axis=0,order=4, mode="clip")

	np.set_printoptions(formatter={'float': '{: 0.2f}'.format})

	inputVoltage = float(name[0:-4].replace("-", "."))
	# for recording purposes it was halved, now you need to multiply by two
	inputVoltage *= 2.0

	# array of the final input 
	final_array = np.zeros((np.size(maximumArray), 2))

	for i in xrange(0, np.size(maximumArray)):
		final_array[i] = [inputVoltage, singleColumn[maximumArray[0][i]]]

	outputName = "../maximumData/" + str(inputVoltage) + ".csv"

	np.savetxt(outputName, final_array, delimiter=",", fmt="%.2f")

	print "finished " + outputName

def main():
	findMax()

if __name__ == '__main__':
  main()