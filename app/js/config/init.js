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

// config/init.js
// Application wide configuration parameters

function configService() {
    return {
        api: {
            // API version number
            version: 0.2,
            // Base URL for every outgoing API request
            base: '/api/v0.2/'
        },
        roles: [
            {
                Name: 'User',
                DisplayName: 'User',
                AuthLevel: 0
            },
            {
                Name: 'Release',
                DisplayName: 'Release Engineer',
                AuthLevel: 1
            },
            {
                Name: 'Admin',
                DisplayName: 'Administrator',
                AuthLevel: 2
            }
        ]
    };
}

var config = angular.module('lighthouse.config', [])
    .factory('configService', configService);

module.exports = config;
