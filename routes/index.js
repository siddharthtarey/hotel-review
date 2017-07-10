var express = require('express')
var routes = express.Router();

var routedata = require('../controller/controller.js');
routes
	.route('/gethotels')
	.get(routedata.getAllHotels)

module.exports = routes;