/*
 * authSetup
 * Manage authentication configuration, including route change events.
 */
function authSetup($rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // if (!authService.isLoggedIn()) {
        //     $location.path('/login');
        // }
        $location.path($location.url());
    });
}

authSetup.$inject = ['$rootScope', '$location', 'authService'];
module.exports = authSetup;