/*
 * navController
 * Manage navigation bar status and information.
 */
function navController($scope, authModel, authService) {
    // init
    $scope.loggedIn = authModel.isLoggedIn();

    console.log('navController: init');

    $scope.$listenTo(authModel, function () {
        console.log('navController: caught authModel event');
        $scope.loggedIn = authModel.isLoggedIn();
        $scope.user = authModel.getUser();

        console.log('navController: scope loggedIn = ' + $scope.loggedIn);
        console.log('navController: scope user = ' + $scope.user);
    });

    $scope.logout = function () {
        authService.logout();
    };
}

navController.$inject = ['$scope', 'authModel', 'authService'];
module.exports = navController;