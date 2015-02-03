/*
 * instances/containerController.js
 * Manages interactions for a single Docker container
 */

function containerController($scope, $routeParams, dockerService, instanceModel) {
    'use strict';

    $scope.host = $routeParams.host;
    $scope.id = $routeParams.id;

    $scope.$listenTo(instanceModel, function () {
        $scope.info = instanceModel.getContainer($scope.id);
    });
}

containerController.$inject = ['$scope', '$routeParams', 'dockerService', 'instanceModel'];
module.exports = containerController;