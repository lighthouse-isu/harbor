// app.js
// Target application root during production builds.

//
// Application setup
//

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
    'ngCookies',
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
function appInit($cookieStore, $location, $rootScope, actions, alertService, appModel, flux) {
    // Redirect if logged in
    if ($cookieStore.get('lighthouse.loggedIn') === true) {
        flux.dispatch(actions.authLogin, $cookieStore.get('lighthouse.user'));
        flux.dispatch(actions.routeChange, $cookieStore.get('lighthouse.route'));
    }

    // Route change handling
    $rootScope.$on('$locationChangeStart', function () {
        // Do not allow alerts to persist across page navigation
        flux.dispatch(actions.routeChange, $location.path());
        alertService.clear();
    });
}

appConfig.$inject = ['$locationProvider'];
appInit.$inject = ['$cookieStore', '$location', '$rootScope', 'actions', 'alertService', 'appModel', 'flux'];

app.config(appConfig);
app.run(appInit);
// Pass control to angular
angular.bootstrap(document, [app.name]);
