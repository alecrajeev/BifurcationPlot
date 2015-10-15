import numpy as np
import sys

def averagePeaks():
	name = sys.argv[1]

	inputVoltage = float(name[0:-4])

	rawData = np.loadtxt(open(name),delimiter=",", skiprows=0)

	peaksCount = np.shape(rawData)[0]

	first = np.array([rawData[0][1]])
	second = np.array([])
	third = np.array([])

	for i in xrange(1, peaksCount):
		if (np.size(second) == 0):
			if (np.abs(rawData[i][1] - first[0]) > .2):
				second = np.append(second, rawData[i][1])
			else:
				first = np.append(first, rawData[i][1])
		else: # this line below only applies when there is a third bifurcation
			if (np.abs(rawData[i][1] - first[0]) > .4 and np.abs(rawData[i][1] - second[0]) > .4):
				third = np.append(third, rawData[i][1])
			else:
				if (np.abs(rawData[i][1] - first[0]) > .3):
					second = np.append(second, rawData[i][1])
				else:
					first = np.append(first, rawData[i][1])

	print first
	print second
	print third

	numberOfBifurcations = 0
	if (np.size(second) == 0):
		numberOfBifurcations = 1
	else:
		if (np.size(third) == 0):
			numberOfBifurcations = 2
		else:
			numberOfBifurcations = 3

	final = np.zeros([numberOfBifurcations, 2])

	if (numberOfBifurcations == 1):
		final[0][0] = inputVoltage
		final[0][1] = np.average(first)
	else:
		if (numberOfBifurcations == 2):
			final[0][0] = inputVoltage
			final[0][1] = np.average(first)		
			final[1][0] = inputVoltage
			final[1][1] = np.average(second)
		else:
			final[0][0] = inputVoltage
			final[0][1] = np.average(first)		
			final[1][0] = inputVoltage
			final[1][1] = np.average(second)
			final[2][0] = inputVoltage
			final[2][1] = np.average(third)			

	# outputName = "../experimental_data/" + str(inputVoltage) + ".csv"

	# np.savetxt(outputName, final, delimiter=",", fmt="%.3f")

	# print "found average " + outputName


def main():
	averagePeaks()

if __name__ == '__main__':
  main()