/*
 * instanceController
 * Main instance view control.
 */
function instanceController($scope, instanceModel, instanceService) {
    'use strict';

    $scope.instances = {};
    instanceService.getInstances();

    $scope.$listenTo(instanceModel, function () {
        $scope.instances = instanceModel.getInstances();
    });
}

instanceController.$inject = ['$scope', 'instanceModel', 'instanceService'];
module.exports = instanceController;
