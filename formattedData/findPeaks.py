import numpy as np
import scipy.signal as sc
import sys
import warnings

def findMax():

	name = sys.argv[1]

	inputVoltage = float(name[0:-4].replace("-", "."))
	# for recording purposes it was halved, now you need to multiply by two
	inputVoltage *= 2.0

	# skip first row because it has headers
	rawData = np.loadtxt(open(name),delimiter=",", skiprows=1)

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

	numberOfPeaks = np.shape(peakRange)[0]

	final_data = np.zeros([numberOfPeaks, 2])
	final_data[:, 0] = inputVoltage

	for i in xrange(0, numberOfPeaks):
		a = getPeakValueFromRegression(rawData, peakRange[i,0], peakRange[i,1])
		if (a != -1):
			final_data[i][1] = a

	outputName = "../maximumData/" + str(inputVoltage) + ".csv"

	np.savetxt(outputName, final_data, delimiter=",", fmt="%.3f")

	print "finished " + outputName

def main():
	findMax()

def getPeakValueFromRegression(rawData, initialIndex, finalIndex):
	"""
	Performs a quadratic regression to find the output voltage at a peak
	"""


	# range of indices where the peak is located
	fullRangeOfIndices = np.arange(initialIndex, finalIndex, dtype=np.int64)

	# raw data of where the peak is located
	onePeakData = rawData[fullRangeOfIndices]

	# quadratic regression, (degree = 2)
	polyFit = np.array([-1])
	outputVoltage = -1

	with warnings.catch_warnings():
	    warnings.filterwarnings('error')
	    try:
	        polyFit = np.polyfit(onePeakData[:, 1], onePeakData[:, 2], 2, full=False)
	    except np.RankWarning:
	    	polyFit = np.array([-1])
	        print "not enough data"


	if (polyFit[0] != -1):
		xValueForPeak = (-polyFit[1])/(2*polyFit[0])
		outputVoltage = polyFit[0]*xValueForPeak*xValueForPeak + polyFit[1]*xValueForPeak + polyFit[2]

	return outputVoltage


if __name__ == '__main__':
  main()