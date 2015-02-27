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

// app.js
// Target application root during production builds.

//
// Application setup
//

// library
var _ = require('lodash');

// app modules
var actions = require('./actions/init'),
    alerts = require('./alerts/init'),
    auth = require('./auth/init'),
    beacons = require('./beacons/init'),
    config = require('./config/init'),
    docker = require('./docker/init'),
    instances = require('./instances/init'),
    nav = require('./nav/init'),
    routes = require('./routes/init'),
    transform = require('./transform/init'),
    users = require('./users/init');

// Initialize the main app
var app = angular.module('lighthouse.app', [
    'flux',
    actions.name,
    alerts.name,
    auth.name,
    beacons.name,
    config.name,
    docker.name,
    instances.name,
    nav.name,
    routes.name,
    transform.name,
    users.name
]);

// Prepare app state
var appModel = require('./appModel');
app.store('appModel', appModel);

// Configuration
function appConfig($locationProvider) {
    $locationProvider.html5Mode(true);
}

// Initialization
function appInit($location, $rootScope, actions, alertService, sessionService, appModel, flux) {
    // Redirect if logged in
    var loggedIn = sessionService.get('lighthouse.loggedIn'),
        user = sessionService.get('lighthouse.user'),
        route = sessionService.get('lighthouse.route');

    if (loggedIn === true && user && route) {
        flux.dispatch(actions.authLogin, user);
        flux.dispatch(actions.routeChange, route);
    }

    // Route change handling
    $rootScope.$on('$locationChangeStart', function () {
        // Do not allow alerts to persist across page navigation
        flux.dispatch(actions.routeChange, $location.path());
        alertService.clear();
    });
}

appConfig.$inject = ['$locationProvider'];
appInit.$inject = [
    '$location', '$rootScope', 'actions',
    'alertService', 'sessionService', 'appModel', 'flux'];

app.config(appConfig);
app.run(appInit);
// Pass control to angular
angular.bootstrap(document, [app.name]);
