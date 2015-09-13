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

	np.savetxt("output.csv", full_data_array, delimiter=',', header=str(r_array.tolist()), comments="")

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