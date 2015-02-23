/*
 * instances/containerController.js
 * Manages interactions for a single Docker container
 */

function containerController($scope, $routeParams, dockerService, instanceModel) {
    'use strict';

    $scope.host = $routeParams.host;
    $scope.id = $routeParams.id;

    dockerService.containers.inspect($scope.host, $scope.id);

    $scope.$listenTo(instanceModel, function () {
        $scope.info = instanceModel.getContainer($scope.id);

        if ($scope.info) {
            var ds = $scope.info.State;
            $scope.state = {
                running: ds.Running && !ds.Paused,
                paused: ds.Paused,
                restarting: ds.Restarting,
                stopped: !(ds.Running || ds.Paused || ds.Restarting)
            };
        }
    });

    $scope.start = function (id) {
        dockerService.containers.start($scope.host, id, null);
    };

    $scope.stop = function (id) {
        dockerService.containers.stop($scope.host, id, null);
    };

    $scope.pause = function (id) {
        dockerService.containers.pause($scope.host, id, null);
    };

    $scope.unpause = function (id) {
        dockerService.containers.unpause($scope.host, id, null);
    };
}

containerController.$inject = ['$scope', '$routeParams', 'dockerService', 'instanceModel'];
module.exports = containerController;