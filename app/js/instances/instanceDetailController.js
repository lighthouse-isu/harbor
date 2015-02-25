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
 * instanceDetailController
 * Main instance detailed view
 */

var _ = require('lodash');

function instanceDetailController($scope, $routeParams, dockerService, instanceModel, instanceService) {
    'use strict';

    // init
    $scope.containers = [];
    $scope.images = [];
    $scope.instance = {name: $routeParams.host};
    $scope.allImages = false;
    $scope.allContainers = false;

    dockerService.containers.list($scope.instance.name, null);
    dockerService.images.list($scope.instance.name, null);

    // State event listeners
    $scope.$listenTo(instanceModel, function () {
        $scope.containers = instanceModel.getContainers();
        $scope.images = instanceModel.getImages();
        //$scope.instance = _.find(instanceModel.getInstances(), {name: $routeParams.host});
    });

    // View handlers
    $scope.getImages = function() {
        dockerService.images.list(
            $scope.instance.name, null, {all: $scope.allImages});
    };

    $scope.getContainers = function () {
        dockerService.containers.list(
            $scope.instance.name, null, {all: $scope.allContainers});
    };
}

instanceDetailController.$inject = ['$scope', '$routeParams', 'dockerService', 'instanceModel', 'instanceService'];
module.exports = instanceDetailController;
