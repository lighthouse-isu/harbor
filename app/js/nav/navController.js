/*
 * navController
 * Manage navigation bar status and information.
 */
function navController($scope, $location, authEvents, authService) {
    // initialize nav
    $scope.loggedIn = authService.isLoggedIn();

    // update nav
    $scope.$on(authEvents.login, function (event, data) {
        $scope.loggedIn = true;
        $scope.user = authService.getUser();
    });

    $scope.logout = function () {
        authService.logout().then(
            // success
            function (response) {
                $scope.loggedIn = false;
                $scope.user = authService.getUser();
                // redirect
                $location.path('/login');
            },
            // error
            function (response) {
                // TODO
                // wire in alertService
            }
        );
    };
}

navController.$inject = ['$scope', '$location', 'authEvents', 'authService'];
module.exports = navController;