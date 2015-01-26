// routes/init.js

var routeConfig = require('./routeConfig');
var routes = angular.module('lighthouse.routes', ['ngRoute']);
routes.config(routeConfig);

module.exports = routes;
