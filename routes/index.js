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