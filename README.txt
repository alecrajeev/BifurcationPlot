This work was done by Alec Rajeev for PHY 243W


0. Installed Rigol driver and connected to program Ultrascope
1. Exported data as excel file from Ultrascope
2. Converted data to csv
3. Removed the first 2 lines that contained no data, just information on the oscilloscope
4. Used the python program findPeaks.py to find the peaks in the data using a quadratic regression

files:
RLC_data ----------------------- initial round raw data (heavily truncated)
RLC_data2 ---------------------- final round raw data (scaled properly)
formattedData ------------------ converted and processed round 1
formattedData2 ----------------- converted and processed round 2
maximumData -------------------- coordinates of peaks round 1
maximumData2 ------------------- coordinates of peaks round 2
formattedData2/findPeaks.py ---- python program that finds peaks using quadratic regression
RLC_data2/xlsxTOcsv.py --------- python program from internet that converts xlsx to csv
RLC_data2/processCSV.py -------- python program that deletes first couple lines of unneccesary lines
RLC_data2/processList.js ------- node program that writes shell commands
RLC_data2/run_convert.sh ------- bash program that convertes all the xlsx files
RLC_data2/list_data.json ------- json file that is just a list of names of xlsx files
maximumData2/full_data.csv ----- csv file that combines peak coordinates (used to build Bifucatoin Diagram)
pythonBuild.py ----------------- program that builds theoretical data
theory_data -------------------- all the theoritical data as json files
csvTOjson.js ------------------- converts csv to json files, for theoretical
processData.js ----------------- node file that processes theoretical data, removes unnecessary quotes
processBifurcate.js ------------ node file that that does more processing
r_array.json ------------------- json file that is the x coordinates of the theoretical data
plotTheoryData.js -------------- javascript file that plots theoretical data using D3 (data visualization)
plotExperimentailData.js ------- javascript file that uses D3 to plot experimental data
index.html --------------------- html file used to plot data sets. (have to use a server to view)

The method used to get from the Oscilloscope was slightly different than what was previosly done. In past iterations of the experiment data was stored locally on the oscilloscope and then transferred to the computer using a flash drive I believe. The method we used was to connect the oscilloscope directly to the computer and import the data using the software Ultrascope. This gave the advantage that we could more easily transfer the data from the lab computer to our home computers and to name the data in a succint manner. We also did not have to convert anything using an MS-dos program.

When Ultrascope is open, you have to click on connect to and the select the oscilloscope. Once it is connected unfortunately you cannot change the scale settings directly on the oscilloscope. You have to use an interface on the computer that simulates the oscilloscope buttons, or you can disconnect.

Once the oscilloscope is connected, you can click on new data measure. This brings up a window where you can import data. You click refresh to prompt the computer to get data from the oscilloscope. Then you can export the data as an .xls file. We did this for all of our measurements.

Once the data files are saved, we used a python program that we got from the internet to convert the .xlsx files to .csv files. (The python converter actually only works on the newer format .xlsx so Google Sheets was used to convert .xls files to .xlsx files). Once the csv files are done converted a python progam we wrote deletes the first couple of lines of the csv file. The converter for some reason adds a couple of lines at the top that just includes commas with no data. No numerical data is deleted.

Once the csv files were formatted correctly, a python program we wrote called findPeaks.py will find the local maximums. This is done by fitting a quadratic regression to the sections of the data that are peaks. Prof. McFarland gave us this idea. This is a more accurate way to find the peaks than just looking at the raw data's peak value because there are more points than just the peak value. By using a quadratic regression a more accurate measurement for the local max is found. Once the regression is calculated, the derivative of the equation is used to find the x-value of local max. Then this x-value is put into the regression to find the local max. The program splits up the data into regions where there is a peak. It does this by finding index of the data where the voltage is above .2. Then it splits up the indexes into separate ranges that represent where the peak is.

The method described above for finding the local max values does not work well for the lower values that are peaks in a bifurcation plot. In fact, for much the data only the upper peaks are found. This is because for the lower peaks, the difference between the peak and the base is too small for the program to distinguish it from noise. This is an unfortunate side effect of using a program to find the peaks.

Now it might seem that using a program to convert the files, format them, and find the peaks takes a long time. However, once the programs are written it greatly speeds up the process. As long as files are named correctly and in the right directory, bash files can be written that will do all the steps in under 5 minutes for the roughly 120 measurements we took. Especially for using a quadratic regression, because to split the data by hand and then put that into a regression function, and then use the regression function to find the local max individually could be potentially very long.

Besides the optimation data measurements, we took two main sets of data to plot the Bifucation diagram. The first one in RLC_data was done first. We did not understand the proper way to use the oscilloscope, so much of the data was truncated. If there was ever a voltage above 5.5, it would just read 5.5. This is a poor use of the oscilloscope. The lower scale additionally did not seem to improve recording of the lower bifurcation points. The second main data set is in RLC_data2. For this set of data, the scale on the oscilloscope was properly changed to make sure that no data was truncated. Unfortunately when we changed the scale there was a slight bug. The new voltages seem to jump by about .2, but we decided this was better than truncating large portions of the data.