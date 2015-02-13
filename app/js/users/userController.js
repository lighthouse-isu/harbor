/*
 * userController
 * Main user view control.
 */
function userController($scope, userModel, userService) {
    'use strict';

    $scope.users = {};
    userService.getUsers();

    $scope.$listenTo(userModel, function () {
        $scope.users = userModel.getUsers();
    });

}

userController.$inject = ['$scope', 'userModel', 'userService'];
module.exports = userController;
