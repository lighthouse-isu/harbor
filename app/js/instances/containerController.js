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

        if ($scope.info) {
            var dState = $scope.info.State;
            $scope.state = {
                running: dState.Running && !dState.Paused,
                paused: dState.Paused,
                restarting: dState.Restarting,
                stopped: !(dState.Running || dState.Paused || dState.Restarting)
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