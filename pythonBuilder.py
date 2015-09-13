import numpy as np
import csv

r_start = 2.0
r_finish = 4.0
r_step = .1

n_steps = 1000

def buildR():

	data_array = np.array([])
	r_array = np.array([])

	for r in np.arange(r_start, r_finish, r_step):
		r_array = np.append(r_array, r)
		data_array = np.append(data_array, .5)

	n_size = np.size(r_array)
	full_data_array = np.zeros([n_steps, n_size])
	one_array = np.ones(n_size)

	full_data_array[0] = one_array/2

	for i in xrange(1, n_steps):
		full_data_array[i] = (r_array*full_data_array[i-1])*(one_array - full_data_array[i-1])

	getSpecialString(r_array)

	np.savetxt("output.csv", full_data_array, delimiter=',', header="2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9", newline="\n")
	# print data_array

def getSpecialString(arr):
	final_string = str(arr[0])

	for i in xrange(1, np.size(arr)):
		final_string += ", " + str(arr[i])

	print final_string

def calculateDataForSingleR(r):
	start = .5
	for i in xrange(0, 1000):
		temp = r*start*(1-start)
		start = temp
		print temp

	return start

def main():
	buildR()

if __name__ == '__main__':
  main()