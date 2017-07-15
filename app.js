/*

This file starts the server and defines important middleware

@author : Siddharth Tarey
@author : Swapnil Kamat
@author : Deepak Shankar
@author : Onkar Deorukhkar
    
*/

require('./data/dbconnection.js').open();
var express = require('express');
var path = require('path');
var start = express();
var routes = require('./routes');
var bodyParser = require('body-parser');

// set path for the resources
start.use(express.static(path.join(__dirname, 'public')));

start.use('/', routes);
start.use(bodyParser.urlencoded({extended: false}))

// set and start a port for the express server
start.set('port', 3000)
start.listen(start.get('port'), function () {
    console.log("started listening");
});
