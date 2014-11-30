// routes/init.js
// Configures routing rules and associates views with controllers

var routes = angular.module('lighthouse.routes', ['ngRoute']);

function configRoutes($routeProvider) {
    $routeProvider
        // Authentication
        .when('/login', {
            template: require('../auth/templates/login.html'),
            controller: 'loginController'
        })
        // Functionality
        .when('/instances', {
            template: require('../instances/templates/instances.html'),
            controller: 'instanceController'
        })
        .when('/instances/:host', {
            template: require('../instances/templates/instance.html'),
            controller: 'instanceDetailController'
        })
        .otherwise({ redirectTo: '/' });
}

configRoutes.$inject = ['$routeProvider'];
routes.config(configRoutes);

module.exports = routes;
