/*
 * loginController
 * Manages login form and requests authentication
 */
function loginController($scope, $location, authService) {
    'use strict';

    $scope.email = '';
    $scope.password = '';

    $scope.login = function () {
        var auth = {
            'Email': $scope.email,
            'Password': $scope.password
        };

        authService.login(auth).then(
            // success
            function (user) {
                $location.path('/instances');
            },
            // error
            function (reason) {
                // TODO wire up alertService
                console.log('invalid!: ' + reason);
            }
        );

        // clear password from (easily accessible) memory
        $scope.password = '';
    };
}

loginController.$inject = ['$scope', '$location', 'authService'];
module.exports = loginController;