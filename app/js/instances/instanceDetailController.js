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

function instanceDetailController($scope, $routeParams, $timeout, flux, dockerService, instanceModel, instanceService) {
    'use strict';

    // init
    $scope.containers = [];
    $scope.images = [];
    $scope.loadingImages = {};
    $scope.instance = {alias: $routeParams.host};
    $scope.allImages = instanceModel.getShowAllImages();
    $scope.allContainers = false;

    dockerService.d('containers.list', {
        host: $scope.instance.alias,
        query: {
            all: $scope.allContainers
        }
    });

    dockerService.d('images.list', {
        host: $scope.instance.alias,
        query: {
            all: $scope.allImages
        }
    });

    // State event listeners
    $scope.$listenTo(instanceModel, function () {
        $scope.containers = instanceModel.getContainers();
        $scope.images = instanceModel.getImages();

        var loadingImages = instanceModel.getLoadingImages();
        _.forEach(loadingImages, function(progress, name) {
            $scope.loadingImages[name] = progress;
        });
        $scope.loadingImages = _.pick($scope.loadingImages, _.keys(loadingImages));

        $timeout(function() {
            $scope.$apply();
        }, 0);
    });

    // View handlers
    $scope.getImages = function() {
        flux.dispatch('imageShowAll', $scope.allImages);

        dockerService.d('images.list', {
            host: $scope.instance.alias,
            query: {
                all: $scope.allImages
            }
        });
    };

    $scope.getContainers = function () {
        dockerService.d('containers.list', {
            host: $scope.instance.alias,
            query: {
                all: $scope.allContainers
            }
        });
    };
}

instanceDetailController.$inject = ['$scope', '$routeParams', '$timeout', 'flux', 'dockerService', 'instanceModel', 'instanceService'];
module.exports = instanceDetailController;
