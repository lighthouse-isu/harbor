/*
 * navController
 * Manage navigation bar status and information.
 */
function navController($scope, appModel, authService) {
    'use strict';

    $scope.loggedIn = appModel.isLoggedIn();

    console.log('navController $scope.loggedIn ' + $scope.loggedIn);

    $scope.$listenTo(appModel, function () {
        console.log('navController: caught appModel event');
        $scope.loggedIn = appModel.isLoggedIn();
        $scope.user = appModel.getUser();

        console.log('navController: scope loggedIn = ' + $scope.loggedIn);
        console.log('navController: scope user = ' + $scope.user);
    });

    $scope.logout = function () {
        authService.logout();
    };
}

navController.$inject = ['$scope', 'appModel', 'authService'];
module.exports = navController;