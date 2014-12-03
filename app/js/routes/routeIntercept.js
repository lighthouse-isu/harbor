/*
 * routeIntercept
 * Listen for route change events and redirect accordingly.
 */
function routeIntercept($rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        if (!authService.isLoggedIn()) {
            $location.path('/login');
        }
        else {
            // proceed with attempted navigation
            $location.path($location.url());
        }
    });
}

routeIntercept.$inject = ['$rootScope', '$location', 'authService'];
module.exports = routeIntercept;