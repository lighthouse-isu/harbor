// app.js
// Target application root during production builds.

// node dependencies
//
// Application setup
//

// app modules
var config = require('./config/init.js'),
    docker = require('./docker/init.js'),
    instances = require('./instances/init.js'),
    routes = require('./routes/init.js');

// Initialize the main app
var app = angular.module('lighthouse.app', [
    'restangular',
    config.name,
    docker.name,
    instances.name,
    routes.name
]);

// Configuration
function appConfig(RestangularProvider, $locationProvider, $routeProvider) {
    RestangularProvider.setBaseUrl('/api/v0');
    $locationProvider.html5Mode(true);
}

appConfig.$inject = ['RestangularProvider', '$locationProvider', '$routeProvider'];
app.config(appConfig);

// Pass control to angular
angular.bootstrap(document, [app.name]);
