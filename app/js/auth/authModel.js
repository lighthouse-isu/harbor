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