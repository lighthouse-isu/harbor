/*
 * navController
 * Manage navigation bar status and information.
 */
function navController($scope, authModel, authService) {
    // init
    $scope.loggedIn = authModel.isLoggedIn();

    $scope.$listenTo(authModel, function () {
        $scope.loggedIn = authModel.isLoggedIn();
        $scope.user = authModel.getUser();
    });

    $scope.logout = function () {
        authService.logout();
    };
}

navController.$inject = ['$scope', 'authModel', 'authService'];
module.exports = navController;