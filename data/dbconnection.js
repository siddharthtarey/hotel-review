var nano = require('nano')('http://localhost:5984');

var dbconn = null;
var connection = function(){
	dbconn = nano.db.use('hotel-data');
	console.log('here');
	//console.log(dbconn)
}

var get = function(){

	return dbconn;
}

module.exports = {

	open : connection,
	get : get
}
