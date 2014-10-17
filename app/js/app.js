
// node dependencies
var angular = require('angular');

// app modules
var main = require('./main/init.js');

// Initialize the main app modules
var app = angular.module('lighthouse', [
    main.name
]);

// Pass control to angular
angular.bootstrap(document, [app.name]);
