/*
 *  Copyright 2015 Caleb Brose, Chris Fogerty, Rob Sheehy, Zach Taylor, Nick Miller
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// users/init.js
// Handles management of Lighthouse users

var userController = require('./userController'),
    userDetailController = require('./userDetailController'),
    userModel = require('./userModel'),
    userService = require('./userService');

// init angular module
var users = angular.module('lighthouse.users', []);

// register module components
users.controller('userController', userController);
users.controller('userDetailController', userDetailController);
users.factory('userService', userService);
users.store('userModel', userModel);

module.exports = users;
