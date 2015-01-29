// docker/init.js
// Creates docker requests targetted at a specific host.

var dockerService = require('./dockerService');
var docker = angular.module('lighthouse.docker', []);

// register module components
docker.factory('dockerService', dockerService);
module.exports = docker;