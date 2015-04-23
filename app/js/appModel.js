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
 * appModel.js
 * Defines and manages application wide concepts
 * such as auth state and route state.
 */

function appModel($location, sessionService) {
    'use strict';

    return {
        // State
        route: '',
        user: {},
        loggedIn: false,

        // Event handlers
        handlers: {
            'authLogin': 'authLogin',
            'authLogout': 'authLogout',
            'currentUser': 'currentUser',
            'routeChange': 'routeChange'
        },

        authLogin: function (user) {
            this.route = '/beacons';
            this.user = user;
            this.loggedIn = true;

            $location.path(this.route);

            this.emitChange();
        },

        authLogout: function () {
            this.route = '/login';
            this.user = {};
            this.loggedIn = false;

            $location.path(this.route);
            sessionService.remove('lighthouse.route');

            this.emitChange();
        },

        currentUser: function (r) {
            this.user = r.response;
            this.user.email = this.user.Email;
            this.emitChange();
        },

        routeChange: function (route) {
            this.route = route;

            $location.path(this.route);
            sessionService.set('lighthouse.route', this.route);

            this.emitChange();
        },

        exports: {
            getRoute: function () {
                return this.route;
            },

            getUser: function () {
                return this.user;
            },

            isLoggedIn: function () {
                return this.loggedIn;
            }
        }
    };
}

appModel.$inject = ['$location', 'sessionService'];
module.exports = appModel;
