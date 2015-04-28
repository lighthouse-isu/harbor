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

/*
 * routeConfig
 * Manage routing control and inject templates into main view.
 */
function routeConfig($routeProvider) {
    $routeProvider
        // Authentication
        .when('/login', {
            template: require('../auth/templates/login.html'),
            controller: 'loginController'
        })
        // Functionality
        .when('/apps', {
            template: require('../deploy/templates/app_list.html'),
            controller: 'appListController'
        })
        .when('/beacons', {
            template: require('../beacons/templates/beacon_list.html'),
            controller: 'beaconListController'
        })
        .when('/instances/:host', {
            template: require('../instances/templates/instance.html'),
            controller: 'instanceDetailController'
        })
        .when('/instances/:host/container/create', {
            template: require('../instances/templates/create_container.html'),
            controller: 'createContainerController'
        })
        .when('/instances/:host/image/add', {
            template: require('../instances/templates/add_image.html'),
            controller: 'addImageController'
        })
        .when('/instances/:host/container/:id', {
            template: require('../instances/templates/container.html'),
            controller: 'containerController'
        })
        .when('/users', {
            template: require('../users/templates/users.html'),
            controller: 'userController'
        })
        .when('/users/:email', {
            template: require('../users/templates/user.html'),
            controller: 'userDetailController'
        })
        .otherwise({ redirectTo: '/' });
}

routeConfig.$inject = ['$routeProvider'];
module.exports = routeConfig;
