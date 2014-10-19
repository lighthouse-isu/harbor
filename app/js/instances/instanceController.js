/*
 * instanceController
 * Main instance view control.
 */
function instanceController($scope, instanceService) {
    'use strict';

    $scope.message = 'hello lighthouse.';
}

instanceController.$inject = ['$scope', 'instanceService'];
module.exports = instanceController;