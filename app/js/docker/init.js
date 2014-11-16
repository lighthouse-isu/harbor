// docker/init.js
// Creates docker requests targetted at a specific host.

var containerService = require('./containerService');

var docker = angular.module('lighthouse.docker', []);

// register module components
docker.factory('containerService', containerService);
module.exports = docker;