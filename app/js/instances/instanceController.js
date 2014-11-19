/*
 * instanceController
 * Main instance view control.
 */
function instanceController($scope, instanceService) {
    'use strict';

    $scope.instances = instanceService.getInstances();
}

instanceController.$inject = ['$scope', 'instanceService'];
module.exports = instanceController;
