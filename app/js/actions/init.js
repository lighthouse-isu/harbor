/*
 * actions/init.js
 * Application wide registry of actions (events). Models subscribe to these triggers.
 */

var keymirror = require('keymirror');

var _actions = keymirror({
    // Authentication
    authLogin: null,
    authLogout: null,

    // Navigation
    routeChange: null,

    // Alerts
    alertClear: null,
    alertCreate: null,
    alertDismiss: null,

    // Instances
    listInstances: null,

    // Docker
    inspectContainer: null,
    listContainers: null,
    startContainer: null,
    stopContainer: null,
    restartContainer: null,
    pauseContainer: null,
    unpauseContainer: null,

    listImages: null,

    // Beacons
    addBeacon: null,
    listBeacons: null,

    // Users
    listUsers: null
});

var actions = angular.module('lighthouse.actions', []);
actions.constant('actions', _actions);

module.exports = actions;
