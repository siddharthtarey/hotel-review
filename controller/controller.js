var connection = require('../data/dbconnection.js');

module.exports.getAllHotels = function(req,res){

	var db = connection.get();
	console.log(db);
	db.list({include_docs : true},function(err,body){
    if(!err) {
        res
        	.status(200)
        	.json(body.rows)
    }
    else{
    	console.log(err);
    }
});
}