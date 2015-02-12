// beacons/init.js
// Handles management of Lighthouse beacons

var beaconController = require('./beaconController');

// init angular module
var beacons = angular.module('lighthouse.beacons', []);

// register module components
beacons.controller('beaconController', beaconController);
beacons.factory('beaconService', beaconService);

module.exports = beacons;
