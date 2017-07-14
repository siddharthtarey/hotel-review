/**

This file contains actions to be taken when a get or a post request is rceived from the browser

@author : Siddharth Tarey
@author : Swapnil Kamat
@author : Deepak Shankar
@author : Onkar Deorukhkar

**/

var express = require('express')
var routes = express.Router();

var routedata = require('../controller/controller.js');

routes
	.route('/gethotels')
	.get(routedata.getAllHotels)

routes
	.route('/getOneHotel/:hotelid')
	.get(routedata.getOneHotel)

routes
	.route('/addOneReview')
	.post(routedata.addOneReview)
module.exports = routes;