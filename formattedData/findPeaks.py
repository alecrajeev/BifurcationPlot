import numpy as np
import scipy.signal as sc
import sys

def findMax():

	name = sys.argv[1]
	rawData = np.loadtxt(open(inputVoltage),delimiter=",", skiprows=1)
"""
	inputVoltage = name

	# skip first row because it has headers
	rawData = np.loadtxt(open(inputVoltage),delimiter=",", skiprows=1)

	cutoff = .2 # cutoff of the what's considered near a peak

	# only includes the data near a peak. ie if it's greater than an arbitrary cutoff of .2
	greaterValues = np.where(rawData[:, 2] > cutoff)

	np.set_printoptions(formatter={'float': '{: 0.2f}'.format})

	sequentialData = rawData[greaterValues[0]][:, 0]
	# print sequentialData

	order = 10 # minimum number of data points between peaks

	# print sequentialData

	splitIndices = np.array([]) # actually the index plus 1
	splitIndices = np.append(splitIndices, sequentialData[0])

	# finds the indices of the edge of each peak
	for i in xrange(0, np.shape(sequentialData)[0] - 1):
		if (sequentialData[i+1] - sequentialData[i] > order):
			splitIndices = np.append(splitIndices, sequentialData[i])
			splitIndices = np.append(splitIndices, sequentialData[i+1])

	splitIndices = np.append(splitIndices, sequentialData[np.shape(sequentialData)[0] - 1])
	splitIndices = splitIndices - 1 # so the subtract one will give the actual index. Before the subtraction it gives the N value. The N value is a column in the raw data

	peakRange = np.zeros([np.size(splitIndices)/2,2])

	for i in xrange(0, np.shape(peakRange)[0]):
		for j in xrange(0,2):
			peakRange[i,j] = splitIndices[i*2+j]

	# print np.arange(peakRange[1,0], peakRange[1,1])

	print "\n"

	e = rawData[np.arange(peakRange[1,0], peakRange[1,1], dtype=np.int64)]

"""
	singleColumn = rawData[:, 2]

	# print e[:, 2]

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