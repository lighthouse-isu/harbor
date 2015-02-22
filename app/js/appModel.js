/*
 * appModel.js
 * Defines and manages application wide concepts
 * such as auth state and route state.
 */

function appModel($cookieStore, $location) {
    'use strict';

    return {
        // State
        route: '',
        user: {},
        loggedIn: false,

        // Event handlers
        handlers: {
            'authLogin': 'authLogin',
            'authLogout': 'authLogout'
        },

        authLogin: function (user) {
            console.log('appModel: caught authLogin');
            console.log('appModel: user.email = ' + user.email);

            this.route = '/instances';
            this.user = user;
            this.loggedIn = true;

            $location.path(this.route);
            $cookieStore.put('lighthouse.loggedIn', true);
            $cookieStore.put('lighthouse.user', user);

            this.emitChange();
        },

        authLogout: function () {
            this.route = '/login';
            this.user = {};
            this.loggedIn = false;

            $location.path(this.route);
            $cookieStore.remove('lighthouse.loggedIn');
            $cookieStore.remove('lighthouse.user');

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

appModel.$inject = ['$cookieStore', '$location'];
module.exports = appModel;