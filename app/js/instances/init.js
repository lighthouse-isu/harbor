// instances/init.js
// Handles discovery and display of Docker host instances

var instanceController = require('./instanceController'),
    instanceDetailController = require('./instanceDetailController'),
    instanceService = require('./instanceService');

// init angular module
var instances = angular.module('lighthouse.instances', []);

// register module components
instances.controller('instanceController', instanceController);
instances.controller('instanceDetailController', instanceDetailController);
instances.factory('instanceService', instanceService);

module.exports = instances;
