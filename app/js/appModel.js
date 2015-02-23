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
            'authLogout': 'authLogout',
            'routeChange': 'routeChange'
        },

        authLogin: function (user) {
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
            $cookieStore.remove('lighthouse.route');

            this.emitChange();
        },

        routeChange: function (route) {
            this.route = route;

            $location.path(this.route);
            $cookieStore.put('lighthouse.route', this.route);

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