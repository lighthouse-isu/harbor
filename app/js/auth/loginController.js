/*
 * loginController
 * Manages login form and requests authentication
 */
function loginController($scope, authService) {
    'use strict';

    $scope.email = '';
    $scope.password = '';

    $scope.login = function () {
        authService.login({
            'Email': $scope.email,
            'Password': $scope.password
        });

        $scope.password = '';
    };
}

loginController.$inject = ['$scope', 'authService'];
module.exports = loginController;