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
var instances = require('./instances/init.js');

// Initialize the main app
var app = angular.module('lighthouse.app', [
    'restangular',
    instances.name
]);

// API configuration
app.constant('baseApiUrl', '/api/v0');

function appConfig(RestangularProvider, baseApiUrl) {
    RestangularProvider.setBaseUrl(baseApiUrl);
}

appConfig.$inject = ['RestangularProvider', 'baseApiUrl'];
app.config(appConfig);

//
// Development application setup
//

// Development module supports mock JSON responses
var devApp = angular.module('lighthouse.devApp', [app.name, 'ngMockE2E']);

// Configure mock responses
// TODO pull JSON from filesystem
function devAppBootstrap($httpBackend, Restangular, baseApiUrl) {

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

    $httpBackend.whenGET(baseApiUrl + '/instances').respond(instances);
}

devAppBootstrap.$inject = ['$httpBackend', 'Restangular', 'baseApiUrl'];
devApp.run(devAppBootstrap);

// Pass control to angular
angular.bootstrap(document, [devApp.name]);
