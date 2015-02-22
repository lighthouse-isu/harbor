// users/init.js
// Handles management of Lighthouse users

var userController = require('./userController'),
    userModel = require('./userModel'),
    userService = require('./userService');

// init angular module
var users = angular.module('lighthouse.users', []);

// register module components
users.controller('userController', userController);
users.factory('userService', userService);
users.store('userModel', userModel);

module.exports = users;
