// app.js
// Target application root during production builds.

//
// Application setup
//

// app modules
var actions = require('./actions/init'),
    alerts = require('./alerts/init'),
    auth = require('./auth/init'),
    config = require('./config/init'),
    docker = require('./docker/init'),
    instances = require('./instances/init'),
    nav = require('./nav/init'),
    routes = require('./routes/init'),
    transform = require('./transform/init');

// Initialize the main app
var app = angular.module('lighthouse.app', [
    'flux',
    'ngCookies',
    actions.name,
    alerts.name,
    auth.name,
    config.name,
    docker.name,
    instances.name,
    nav.name,
    routes.name,
    transform.name
]);

// Configuration
function appConfig($locationProvider) {
    $locationProvider.html5Mode(true);
}

// Initialization
function appInit($cookieStore, $rootScope, $location, actions, flux, alertService) {
    flux.createStore('appStore', {
        // State
        route: '',

        // Event handlers
        handlers: {
            'authLogin': 'authLogin',
            'authLogout': 'authLogout'
        },

        authLogin: function (user) {
            this.route = '/instances';
            $location.path(this.route);

            $cookieStore.put('lighthouse.loggedIn', true);
            $cookieStore.put('lighthouse.user', user);

            this.emitChange();
        },

        authLogout: function () {
            this.route = '/login';
            $location.path(this.route);

            $cookieStore.remove('lighthouse.loggedIn');
            $cookieStore.remove('lighthouse.user');

            this.emitChange();
        },

        exports: {
            getRoute: function () {
                return this.route;
            }
        }
    });

    // Redirect if logged in
    if ($cookieStore.get('lighthouse.loggedIn')) {
        console.log('appInit: logged in!');
        console.log('appInit: lighthouse.user = ' + $cookieStore.get('lighthouse.user'));
        flux.dispatch(actions.authLogin, $cookieStore.get('lighthouse.user'));
    }

    // Route change handling
    $rootScope.$on('$locationChangeStart', function () {
        // Do not allow alerts to persist across page navigation
        alertService.clear();
    });
}

appConfig.$inject = ['$locationProvider'];
appInit.$inject = ['$cookieStore', '$rootScope', '$location', 'actions', 'flux', 'alertService'];

app.config(appConfig);
app.run(appInit);
// Pass control to angular
angular.bootstrap(document, [app.name]);
