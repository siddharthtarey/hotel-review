var connection = require('../data/dbconnection.js');

module.exports.getAllHotels = function(req,res){

	var db = connection.get();
	console.log(db);
	db.list({include_docs : true},function(err,body){
    if(!err) {
//        res
//        	.status(200)
//        	//.json(body.rows)
//            .render('demo.html', {title : 'Demo'});
        
        var hotelList = [
            'Buffalo Wild Wings',
            'Dominos',
            'Tandoor of India',    
            'KFC',
            'Wendy\'s',
            'Chipotle',
            'Raj Mahal',
            'Pizza Hut',
            'Papa John\'s',
            'Red Lobster',
            'Olive Garden',
            'Shiv Sagar'
    ];
    res.send(hotelList);
        
    }
    else{
    	console.log(err);
    }
});
}