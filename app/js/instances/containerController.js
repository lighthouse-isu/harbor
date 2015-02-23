/*
 *  Copyright 2015 Caleb Brose, Chris Fogerty, Rob Sheehy, Zach Taylor, Nick Miller
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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
