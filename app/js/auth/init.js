// auth/init.js
// Handles user session data and view access control.

var authModel = require('./authModel'),
    authService = require('./authService'),
    loginController = require('./loginController');

var auth = angular.module('lighthouse.auth', []);

auth.controller('loginController', loginController);
auth.factory('authService', authService);
auth.store('authModel', authModel);

module.exports = auth;