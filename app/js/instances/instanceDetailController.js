/*
 * instanceDetailController
 * Main instance detailed view
 */

function instanceDetailController($scope, $routeParams, containerService, instanceModel) {
    'use strict';

    // init
    $scope.containers = [];
    $scope.instance = $routeParams.host;
    containerService.list($scope.instance);

    // State event listeners
    $scope.$listenTo(instanceModel, function () {
        $scope.containers = instanceModel.getContainers();
    });
}

instanceDetailController.$inject = ['$scope', '$routeParams', 'containerService', 'instanceModel'];
module.exports = instanceDetailController;
