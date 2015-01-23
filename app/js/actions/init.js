/*
 * actions/init.js
 * Application wide registry of actions (events). Models subscribe to these triggers.
 */

var _actions = {
    listContainers: 'listContainers'
};

var actions = angular.module('lighthouse.actions', []);
actions.constant('actions', _actions);

module.exports = actions;