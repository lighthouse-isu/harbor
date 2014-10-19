// app.js
// Target application root during production builds.

// hack: restangular expects lodash and angular to be globally defined
// and hence, doesn't play well with browserify
global._ = require('lodash');
global.angular = require('angular');

// node dependencies
var angular = require('angular'),
    angularMocks = require('angular-mocks'),
    restangular = require('restangular');

//
// Application setup
//

// app modules
var main = require('./main/init.js');

// Initialize the main app
var app = angular.module('lighthouse.app', [
    'restangular',
    main.name
]);

function appConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl('api/v0/');
}

appConfig.$inject = ['RestangularProvider'];
app.config(appConfig);

//
// Development application setup
//

// Development module supports mock JSON responses
var devApp = angular.module('lighthouse.devApp', [app.name, 'ngMockE2E']);

// Configure mock responses
// TODO pull JSON from filesystem
function devAppBootstrap($httpBackend, Restangular) {

    // Instance discovery
    var instances = [
        {
            host: 'mock1.gce.com',
            status: 'up',
            containers: 3,
            provider: 'gce',
            ipAddress: '192.168.1.1'
        },
        {
            host: 'mock2.aws.com',
            status: 'down',
            provider: 'aws',
            ipAddress: '192.168.1.2'
        }
    ];
}

devAppBootstrap.$inject = ['$httpBackend', 'Restangular'];
devApp.run(devAppBootstrap);

// Pass control to angular
angular.bootstrap(document, [devApp.name]);
