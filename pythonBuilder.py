import numpy as np
import csv

r_start = 2.0
r_finish = 4.0
r_step = .1

n_thermal = 1000 # number of thermalization steps
n_steps = 1000 # number of final steps

def buildR():

	r_array = np.array([])

	for r in np.arange(r_start, r_finish, r_step):
		r_array = np.append(r_array, r) # builds array with every r value that will be used

	n_size = np.size(r_array) # the number of r's to be calculated (number of columns)
	thermalization_data_array = np.zeros([n_thermal, n_size])
	final_data_array = np.zeros([n_steps, n_size])
	one_array = np.ones(n_size) # array with just ones

	thermalization_data_array[0] = one_array/2 # gives starting point for each as .5

	for i in xrange(1, n_thermal):
		thermalization_data_array[i] = (r_array*thermalization_data_array[i-1])*(one_array - thermalization_data_array[i-1])

	final_data_array[0] = thermalization_data_array[n_thermal-1]

	print final_data_array[0]

	for i in xrange(1, n_steps):
		final_data_array[i] = (r_array*final_data_array[i-1])*(one_array - final_data_array[i-1])

	np.savetxt("output.csv", final_data_array, delimiter=',', header=str(r_array.tolist())[1:-1], comments="")


def main():
	buildR()

if __name__ == '__main__':
  main()