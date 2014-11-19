// routes/init.js
// Configures routing rules and associates views with controllers

var routes = angular.module('lighthouse.routes', ['ngRoute']);

var fs = require('fs');

function configRoutes($routeProvider) {
    $routeProvider
        .when('/instances', {
            template: fs.readFileSync(__dirname + '/../instances/templates/instances.html', 'utf8'),
            controller: 'instanceController'
        });
}

configRoutes.$inject = ['$routeProvider'];
routes.config(configRoutes);

module.exports = routes;