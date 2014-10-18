// app.js
// Target application root during production builds.

// node dependencies
var angular = require('angular'),
    angularMocks = require('angular-mocks');

// app modules
var main = require('./main/init.js');

// Initialize the main app
var app = angular.module('lighthouse.app', [
    main.name
]);

// Development module supports mock JSON responses
var devApp = angular.module('lighthouse.devApp', [app.name, 'ngMockE2E']);

// Configure mock responses
// TODO pull JSON from filesystem
function devAppBootstrap($httpBackend) {
    var people = [{name: 'nick', age: 21}, {name: 'bill', age: 100}];
    $httpBackend.whenGET('/people/').respond(people);
}

devAppBootstrap.$inject = ['$httpBackend'];
devApp.run(devAppBootstrap);

// Pass control to angular
angular.bootstrap(document, [devApp.name]);
