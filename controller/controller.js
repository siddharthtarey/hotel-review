var connection = require('../data/dbconnection.js');

module.exports.getAllHotels = function(req,res){

    var db = connection.get();
    db.list({include_docs : true},function(err,body){

       
        if(!err) {
             var result = [];
            body.rows.forEach(function(docs){

                result.push({ "_id" : docs.doc._id , "name" : docs.doc.name,
                 "stars" : docs.doc.stars , "description ": docs.doc.description , "location" : docs.doc.location})
                
            });
        
        res
            .status(200)
            .json(result);
        
        }
    else{
        res
            .status(500)
            .json(err)
    }
});
}

module.exports.getOneHotel = function(req, res){

    var db = connection.get();
    var docid = req.params.hotelid
    db.get(docid , function(err,data){

        if(!err){
        res
            .status(200)
            .json(data)
        }
        else{

            res
                .status(500)
                .json(err)
        }

    })

}