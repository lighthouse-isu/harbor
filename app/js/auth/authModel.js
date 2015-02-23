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
 * auth/authModel.js
 * Manages authentication state.
 */

function authModel() {
    'use strict';

    return {
        // State

        // user {object} keys (email)
        user: {},
        loggedIn: false,

        // Event handlers
        handlers: {
            'authLogin': 'authLogin',
            'authLogout': 'authLogout'
        },

        authLogin: function (user) {
            this.user = user;
            this.loggedIn = true;
            this.emitChange();
        },

        authLogout: function () {
            this.user = {};
            this.loggedIn = false;
            this.emitChange();
        },

        // State access
        exports: {
            isLoggedIn: function () {
                return this.loggedIn;
            },

            getUser: function () {
                return this.user;
            }
        }
    };
}

module.exports = authModel;
