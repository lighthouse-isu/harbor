// app.js
// Target application root during production builds.

// node dependencies
//
// Application setup
//

// app modules
var config = require('./config/init.js'),
    docker = require('./docker/init.js'),
    instances = require('./instances/init.js');

// Initialize the main app
var app = angular.module('lighthouse.app', [
    'restangular',
    config.name,
    docker.name,
    instances.name
]);

// Configuration
function appConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/v0');
}

appConfig.$inject = ['RestangularProvider'];
app.config(appConfig);

// Pass control to angular
angular.bootstrap(document, [app.name]);
