/*
 * actions/init.js
 * Application wide registry of actions (events). Models subscribe to these triggers.
 */

var keymirror = require('keymirror');

var _actions = keymirror({
    // Authentication
    authLogin: null,
    authLogout: null,

    // Instances
    listInstances: null,

    // Docker
    listContainers: null,
    startContainer: null,
    stopContainer: null,
    restartContainer: null,
    pauseContainer: null,
    unpauseContainer: null,

    listImages: null
});

var actions = angular.module('lighthouse.actions', []);
actions.constant('actions', _actions);

module.exports = actions;