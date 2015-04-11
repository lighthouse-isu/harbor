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

// roles/init.js
// Handles Lighthouse role defintions

var user = {
    Name: 'User',
    DisplayName: 'User',
    AuthLevel: 0
},
release = {
    Name: 'Release',
    DisplayName: 'Release Engineer',
    AuthLevel: 1
},
admin = {
    Name: 'Admin',
    DisplayName: 'Administrator',
    AuthLevel: 2
};

var _roles = [user, release, admin];

var roles = angular.module('lighthouse.roles', []);

roles.constant('user', user);
roles.constant('release', release);
roles.constant('admin', admin);
roles.constant('roles', _roles);

module.exports = actions;
