// beacons/init.js
// Handles management of Lighthouse beacons

var beaconController = require('./beaconController'),
    beaconModel = require('./beaconModel'),
    beaconService = require('./beaconService');

// init angular module
var beacons = angular.module('lighthouse.beacons', []);

// register module components
beacons.controller('beaconController', beaconController);
beacons.factory('beaconService', beaconService);
beacons.store('beaconModel', beaconModel);

module.exports = beacons;
