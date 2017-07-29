/*

This file contains actions to be taken when a get or a post request is rceived from the browser

@author : Siddharth Tarey
@author : Swapnil Kamat
@author : Deepak Shankar
@author : Onkar Deorukhkar

*/

var express = require('express')
var routes = express.Router();
var parser = require('body-parser');

var routedata = require('../controller/controller.js');
routes.use(parser.json());
routes.use(parser.urlencoded({extended:true}));

// route the request to getallhotels
routes
    .route('/gethotels')
    .get(routedata.getAllHotels)

// route the request to get details of a hotel using hotel id
routes
    .route('/getOneHotel/:hotelid')
    .get(routedata.getOneHotel)

// route the request to add a review
routes
	.route('/addOneReview')
	.post(routedata.addOneReview)

routes
	.route('/deleteReview')
	.get(routedata.deleteReview)

routes
	.route('/updateReview')
	.post(routedata.updateReview)

module.exports = routes;