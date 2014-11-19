// routes/init.js
// Configures routing rules and associates views with controllers

var routes = angular.module('lighthouse.routes', ['ngRoute']);

function configRoutes($routeProvider) {
    $routeProvider
        .when('/instances', {
            //template: require('../instances/templates/instances.html'),
            template: 'test',
            controller: 'instanceController'
        });
}

configRoutes.$inject = ['$routeProvider'];
routes.config(configRoutes);

module.exports = routes;