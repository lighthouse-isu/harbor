/*
 * instanceController
 * Main instance view control.
 */
function instanceController($scope, instanceService) {
    'use strict';

    $scope.message = instanceService.getInstances();
}

instanceController.$inject = ['$scope', 'instanceService'];
module.exports = instanceController;