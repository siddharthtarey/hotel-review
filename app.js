/**
 * Created by Swapnil on 4/11/2017.
 */
 require('./data/dbconnection.js').open();
var express = require('express');
var path = require('path');
var start = express();
var routes = require('./routes');
var bodyParser = require('body-parser');


start.use(express.static(path.join(__dirname,'public')));

start.use(bodyParser.urlencoded({extended: false}))
start.use('/',routes);



start.set('port',3000)
start.listen(start.get('port'), function(){

	console.log("started listening");	
});



