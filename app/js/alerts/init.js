/*
 * alerts/init.js
 * Components to manage global alert popups.
 */

var alertController = require('./alertController'),
    alertDirective = require('./alertDirective'),
    alertModel = require('./alertModel'),
    alertService = require('./alertService');

var alerts = angular.module('lighthouse.alerts', []);

alerts.controller('alertController', alertController);
alerts.directive('alerts', alertDirective);
alerts.factory('alertService', alertService);
alerts.store('alertModel', alertModel);

module.exports = alerts;