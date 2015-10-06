import numpy as np
import sys

r_start = 2.75
r_finish = 2.75
r_step = .1 #.0001

r_start = float(sys.argv[1])
r_finish = float(sys.argv[2])

n_thermal = 10000 # number of thermalization steps
n_steps = 100#2000 # number of final steps

def buildR():

	r_array = np.array([])

	for r in np.arange(r_start, r_finish, r_step):
		r_array = np.append(r_array, r) # builds array with every r value that will be used

	n_size = np.size(r_array) # the number of r's to be calculated (number of columns)
	thermalization_data_array = np.zeros([n_thermal, n_size])
	final_data_array = np.zeros([n_steps, n_size])
	one_array = np.ones(n_size) # array with just ones

	thermalization_data_array[0] = one_array/2 # gives starting point for each as .5

	for i in xrange(1,n_thermal):
		thermalization_data_array[i] = (r_array*thermalization_data_array[i-1])*(one_array - thermalization_data_array[i-1])

	final_data_array[0] = thermalization_data_array[n_thermal-1]

	# for i in xrange(1, n_steps):
	for i in xrange(1,n_steps):
		final_data_array[i] = (r_array*final_data_array[i-1])*(one_array - final_data_array[i-1])

	# this builds the header list. I needed to convert it to a string for the csvTOjson converter to understand it
	r_array_string = np.array([])
	for i in xrange(0,r_array.size):
		beforeDash = str(r_array[i])
		beforeDash = beforeDash.replace(".","_")
		beforeDash = beforeDash + "a"
		r_array_string = np.append(r_array_string, beforeDash)

	# just the name of the output file. It will be named by it's first point
	startName = str(r_start).replace(".", "_");
	output_name = "theory_data/output" + startName + ".csv"

	np.savetxt(output_name, final_data_array, delimiter=',', header=str(r_array_string.tolist())[1:-1], comments="")

	print "finished python ", output_name

def main():
	buildR()

if __name__ == '__main__':
  main()