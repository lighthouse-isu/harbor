// instances/init.js
// Handles discovery and display of Docker host instances

var instanceController = require('./instanceController'),
    instanceService = require('./instanceService');

// init angular module
var instances = angular.module('lighthouse.instances', []);

// register module components
instances.controller('instanceController', instanceController);
instances.factory('instanceService', instanceService);

module.exports = instances;