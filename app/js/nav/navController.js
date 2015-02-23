/*
 * navController
 * Manage navigation bar status and information.
 */
function navController($scope, appModel, authService) {
    'use strict';
    $scope.loggedIn = appModel.isLoggedIn();

    $scope.$listenTo(appModel, function () {
        $scope.loggedIn = appModel.isLoggedIn();
        $scope.user = appModel.getUser();
    });

    $scope.logout = function () {
        authService.logout();
    };
}

navController.$inject = ['$scope', 'appModel', 'authService'];
module.exports = navController;