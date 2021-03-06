/*

This file contains the behavior of the application when a certain route is encountered

@author : Siddharth Tarey
@author : Swapnil Kamat
@author : Deepak Shankar
@author : Onkar Deorukhkar

*/

var connection = require('../data/dbconnection.js');
var random = require("random-js")();
var dateFormat = require('dateformat');


// fetch list of all the hotels


module.exports.getAllHotels = function(req,res){

    var db = connection.get();

    db.view('hotel-design','hotel-view',{'include_docs' : true},function(err,body){

        if(err){

            res
                .status(500)
                .json(err)
        }

        else{
            var result = [];
            body.rows.forEach(function (docs) {

                result.push(docs.value)
                
             })   
            
            console.log(body)
            res
                .status(200)
                .json(result)

        }

    });
}

// fetch details of a hotel using hotel id
module.exports.getOneHotel = function (req, res) {
    var db = connection.get();
    var docid = req.params.hotelid
    db.get(docid, function (err, data) {
        if (!err) {
            res
                .status(200)
                .json(data);
        } else {
            res
                .status(500)
                .json(err)
        }
    })
}

// Add review to the hotel
module.exports.addOneReview = function (req, res) {
    var db = connection.get();
    if (req.body && req.body.hotelid  && req.body.service && req.body.cleanliness &&
        req.body.overall && req.body.value && req.body.sleepQuality && req.body.rooms && req.body.location &&
        req.body.authorLocation && req.body.title && req.body.author && req.body.content) {

        var hotelid = req.body.hotelid;
        var service = req.body.service;
        var cleanliness = req.body.cleanliness;
        var overall = req.body.overall;
        var value = req.body.value;
        var sleepQuality = req.body.sleepQuality;
        var rooms = req.body.rooms;
        var location = req.body.location;

        var authorLocation = req.body.authorLocation;
        var title = req.body.title;
        var author = req.body.author;
        var content = req.body.content;
        var reviewid = random.integer(1, 5432190).toString();
        var now = new Date();
        var date = dateFormat(now, "longDate");

        var data = {
            "Ratings": {
                "Service": service,
                "Cleanliness": cleanliness,
                "Overall": overall,
                "Value": value,
                "Sleep Quality": sleepQuality,
                "Rooms": rooms,
                "Location": location
            },
            "AuthorLocation": authorLocation,
            "Title": '"'+title+'"',
            "Author": author,
            "ReviewID": reviewid,
            "Content": content,
            "Date": date
        }

        db.get(hotelid, function (err, oldData) {
            if (err) {
                res
                    .status(404)
                    .json({
                        "Error": "hotel not found"
                    })
            } else {
                oldData.Reviews.push(data);
                var newData = []
                newData.push(oldData)
                db.bulk({
                    docs: newData
                }, function (err, body) {
                    if (err) {
                        res
                            .status(500)
                            .json({
                                "Error": err
                            })
                    } else {
                        res
                            .status(201)
                            .json(newData)
                    }
                });
            }
        })
    } else {
        res
            .status(500)
            .json({
                "Error": "required fields missing"
            })
    }
}


module.exports.deleteReview = function(req,res){
     var db = connection.get();

    if(req.query && req.query.hotelid && req.query.reviewid){
        
        db.get(req.query.hotelid,function(err,oldData){


            if(err){

                res
                    .status(404)
                    .json({"Error" : "Data not found"})
            }
            else{
                
                var reviewData = oldData.Reviews

                var filteredData = reviewData.filter(function(items){
                    return items.ReviewID !== req.query.reviewid
                })

                oldData.Reviews = filteredData
                var newData = []
                newData.push(oldData)
                db.bulk({
                    docs: newData
                }, function (err, body) {
                    if (err) {
                        res
                            .status(500)
                            .json({
                                "Error": err
                            })
                    } else {
                        res
                            .status(201)
                            .json(newData)
                    }
                });
            }

        })
    }

    else{

        res
            .status(500)
            .json({"error" : "required field missing"})
    }

}

module.exports.updateReview = function(req,res){


     var db = connection.get();
    if (req.body && req.body.hotelid  && req.body.service && req.body.cleanliness &&
        req.body.overall && req.body.value && req.body.sleepQuality && req.body.rooms && req.body.location &&
        req.body.authorLocation && req.body.title && req.body.author && req.body.content && req.body.reviewid) {

        
        var now = new Date();
        var date = dateFormat(now, "longDate");

        db.get(req.body.hotelid,function(err, data){

            if(err){

                res
                    .status(404)
                    .json({"Error" : "Data not found"})
            }

            else{

                var reviewData = data.Reviews

                for(var i in reviewData){

                    if(reviewData[i].ReviewID == req.body.reviewid){

                        reviewData[i].Ratings.Service = req.body.service;
                        reviewData[i].Ratings.Cleanliness = req.body.cleanliness;
                        reviewData[i].Ratings.Overall = req.body.overall;
                        reviewData[i].Ratings.Value = req.body.value;
                        reviewData[i].Ratings["Sleep Quality"] = req.body.sleepQuality;
                        reviewData[i].Ratings.Rooms = req.body.rooms;
                        reviewData[i].Ratings.Location = req.body.location;
                        reviewData[i].Author = req.body.author;
                        reviewData[i].AuthorLocation = req.body.authorLocation;
                        reviewData[i].Title = req.body.title;
                        reviewData[i].Content = req.body.content;
                        reviewData[i].Date = date;
                        break;
                    }
                }

                data.Reviews = reviewData;

                var newData = []
                newData.push(data)
                db.bulk({
                    docs: newData
                }, function (err, body) {
                    if (err) {
                        res
                            .status(500)
                            .json({
                                "Error": err
                            })
                    } else {
                        res
                            .status(201)
                            .json(newData)
                    }
                });


            }
        })
    }

    else{

        res
            .status(500)
            .json({"error" : "required field missing"})

    }

}