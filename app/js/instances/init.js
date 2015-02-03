// instances/init.js
// Handles discovery and display of Docker host instances

var containerController = require('./containerController'),
    instanceController = require('./instanceController'),
    instanceDetailController = require('./instanceDetailController'),
    instanceModel = require('./instanceModel'),
    instanceService = require('./instanceService');

// init angular module
var instances = angular.module('lighthouse.instances', []);

// register module components
instances.controller('containerController', containerController);
instances.controller('instanceController', instanceController);
instances.controller('instanceDetailController', instanceDetailController);

instances.factory('instanceService', instanceService);
instances.store('instanceModel', instanceModel);

module.exports = instances;
