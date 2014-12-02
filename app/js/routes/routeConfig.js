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
        .when('/instances', {
            template: require('../instances/templates/instances.html'),
            controller: 'instanceController'
        })
        .when('/instances/:host', {
            template: require('../instances/templates/instance.html'),
            controller: 'instanceDetailController'
        })
        .otherwise({ redirectTo: '/' });
}

routeConfig.$inject = ['$routeProvider'];
module.exports = routeConfig;