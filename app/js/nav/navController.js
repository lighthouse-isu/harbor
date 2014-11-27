/*
 * navController
 * Manage navigation bar status and information.
 */
function navController($scope, authEvents, authService) {
    // initialize nav
    $scope.loggedIn = authService.isLoggedIn();

    // update nav
    $scope.$on(authEvents.login, function (event, data) {
        $scope.loggedIn = authService.isLoggedIn();
        $scope.user = authService.getUser();
    });
}

navController.$inject = ['$scope', 'authEvents', 'authService'];
module.exports = navController;