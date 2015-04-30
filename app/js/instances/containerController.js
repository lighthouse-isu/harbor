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

function containerController($scope, $routeParams, $sce, $timeout, $interval, dockerService, instanceModel) {
    'use strict';

    $scope.host = $routeParams.host;
    $scope.id = $routeParams.id;
    $scope.logs = "";

    dockerService.d('containers.inspect', {
        host: $scope.host,
        id: $scope.id
    });

    var loadLogs = function() {
        dockerService.d('containers.logs', {
            host: $scope.host,
            id: $scope.id,
            responseType: 'text',
            query: {
                stderr: '1',
                stdout: '1',
                timestamps: '0',
                follow: '0'
            }
        });
    };

    loadLogs();

    var logInterval, logsElement = $('.logs');

    $scope.$listenTo(instanceModel, function () {
        $scope.info = instanceModel.getContainer($scope.id);

        $scope.logs = $sce.trustAsHtml(instanceModel.getContainerLogs($scope.id));
        if ($scope.follow) {
            $timeout(function () { 
                logsElement.scrollTop(logsElement[0].scrollHeight);
            }, 0);
        }


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

    $scope.followLogs = function (_id) {
        if ($scope.follow) {
            logInterval = $interval(loadLogs, 750);
            logsElement.scrollTop(logsElement[0].scrollHeight);
        } else {
            $interval.cancel(logInterval);
            logInterval = undefined;
        }
    };

    $scope.start = function (_id) {
        dockerService.d('containers.start', {
            host: $scope.host,
            id: _id
        });
    };

    $scope.stop = function (_id) {
        dockerService.d('containers.stop', {
            host: $scope.host,
            id: _id
        });
    };

    $scope.pause = function (_id) {
        dockerService.d('containers.pause', {
            host: $scope.host,
            id: _id
        });
    };

    $scope.unpause = function (_id) {
        dockerService.d('containers.unpause', {
            host: $scope.host,
            id: _id
        });
    };

    $scope.$on('$destroy', function() {
        if (!_.isUndefined(logInterval)) {
            $interval.cancel(logInterval);
            logInterval = undefined;
        }
    });
}

containerController.$inject = ['$scope', '$routeParams', '$sce', '$timeout', '$interval', 'dockerService', 'instanceModel'];
module.exports = containerController;
