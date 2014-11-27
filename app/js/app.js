// app.js
// Target application root during production builds.

//
// Application setup
//

// app modules
var auth = require('./auth/init'),
    config = require('./config/init'),
    docker = require('./docker/init'),
    instances = require('./instances/init'),
    routes = require('./routes/init');

// Initialize the main app
var app = angular.module('lighthouse.app', [
    'restangular',
    auth.name,
    config.name,
    docker.name,
    instances.name,
    routes.name
]);

// Configuration
function appConfig(RestangularProvider, $locationProvider) {
    RestangularProvider.setBaseUrl('/api/v0.1');
    $locationProvider.html5Mode(true);
}

appConfig.$inject = ['RestangularProvider', '$locationProvider'];
app.config(appConfig);

// Pass control to angular
angular.bootstrap(document, [app.name]);
