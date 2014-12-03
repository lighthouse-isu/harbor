// auth/init.js
// Handles user session data and view access control.

var authEvents = require('./authEvents'),
    authService = require('./authService'),
    loginController = require('./loginController');

var auth = angular.module('lighthouse.auth', []);

auth.constant('authEvents', authEvents);
auth.controller('loginController', loginController);
auth.factory('authService', authService);

module.exports = auth;