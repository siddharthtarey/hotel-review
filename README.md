**************************************Instructions to copy the dat to couchDB*********************************************************

- You need to have the couchdb installed in your system
- If you have a Windows system, you need to have the cURL utility installed on your system
- You can follow the instruction to install the cURL utility here: http://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/objectstorage/restrict_rw_accs_cntainers_REST_API/files/installing_curl_command_line_tool_on_windows.html

- In addition to this you need to have couchdb-backup.sh in your system which helps you import the entire database in couchdb.
This utility can be found here: https://github.com/danielebailo/couchdb-dump . We have included this shell file along with our submission. 

- The data is contained in the test.json file
- The data can be loaded in couchDB using the following command:
$ couchdb-backup.sh -r -H http://localhost:5984 -d hotel-data -f test.json

- You can view the the database and the design documents using the FUTON interface of CouchDB


*************************************Instructions to run the application****************************************************************

- You need to have Node.js installed in your system
- Open Command prompt
- Navigate to the folder where you have extracted the source code.
- Run the following command:
$ npm install 
- the above package will install the neccessary files to run the application****************************************************************
- start the server using the following command:
$ nodemon app.js
- Navigate to localhost:3000 to access the application



