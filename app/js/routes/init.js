// routes/init.js

var routeConfig = require('./routeConfig'),
    routeIntercept = require('./routeIntercept');

var routes = angular.module('lighthouse.routes', ['ngRoute']);
routes.config(routeConfig);
routes.run(routeIntercept);

module.exports = routes;
