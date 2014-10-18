
var angular = require('angular'),
    mainController = require('./mainController'),
    dockerService = require('./dockerService');

// init angular module
var main = angular.module('lighthouse.main', []);

// register module components
main.controller('mainController', mainController);
main.factory('dockerService', dockerService);

module.exports = main;