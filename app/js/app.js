// app.js
// Target application root during production builds.

//
// Application setup
//

// app modules
var actions = require('./actions/init'),
    auth = require('./auth/init'),
    config = require('./config/init'),
    docker = require('./docker/init'),
    instances = require('./instances/init'),
    nav = require('./nav/init'),
    routes = require('./routes/init');

// Initialize the main app
var app = angular.module('lighthouse.app', [
    'flux',
    actions.name,
    auth.name,
    config.name,
    docker.name,
    instances.name,
    nav.name,
    routes.name
]);

// Configuration
function appConfig($locationProvider) {
    $locationProvider.html5Mode(true);
}

// Initialization
function appInit($location, flux) {
    flux.createStore('appStore', {
        // State
        route: '',

        // Event hanlders
        handlers: {
            'authLogin': 'authLogin',
            'authLogout': 'authLogout'
        },

        authLogin: function () {
            this.route = '/instances';
            $location.path(this.route);
            this.emitChange();
        },

        authLogout: function () {
            this.route = '/login';
            $location.path(this.route);
            this.emitChange();
        },

        exports: {
            getRoute: function () {
                return this.route;
            }
        }
    });
}

appConfig.$inject = ['$locationProvider'];
appInit.$inject = ['$location', 'flux'];

app.config(appConfig);
app.run(appInit);
// Pass control to angular
angular.bootstrap(document, [app.name]);
