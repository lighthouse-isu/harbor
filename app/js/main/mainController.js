/*
 * mainController
 * Initial view control
 */
function mainController($scope, dockerService) {
    'use strict';

    $scope.message = 'hello lighthouse.';
}

mainController.$inject = ['$scope', 'dockerService'];
module.exports = mainController;