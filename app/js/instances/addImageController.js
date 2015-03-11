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

var _ = require('lodash');

function addImageController($scope, $routeParams, $location, dockerService, instanceModel) {
    'use strict';
    $scope.host = $routeParams.host;

    $scope.searchTerm = '';
    $scope.foundImages = [];
    $scope.searchIsLoading = false;

    $scope.allTags = true;

    $scope.$listenTo(instanceModel, function () {
      $scope.searchIsLoading = false;
      $scope.foundImages = instanceModel.getSearchedImages();
    });

    $scope.inputHandler = function(event) {
      if (event.type === 'keypress' && event.which === 13) {
        $scope.searchImage();
      }
    };

    $scope.searchImage = function() {
      if ($scope.searchIsLoading) {
        return;
      }

      $scope.foundImages = [];
      dockerService.images.search($scope.host, null, {
        term: $scope.searchTerm.toLowerCase()
      });
      $scope.searchIsLoading = true;
    };

    $scope.stageImage = function(image) {
      $scope.selectedImage = image;
      $scope.imageTag = 'latest';
    };

    $scope.pullImage = function(image) {
      var imageName = image.name;
      if (!$scope.allTags) {
        imageName = [image.name, $scope.imageTag].join(':');
      }

      dockerService.images.pull($scope.host, null, {
        fromImage: imageName
      }, ['{status}', '{error}']);

      $('#pullImageModal').on('hidden.bs.modal', function(e) {
        $location.path('/instances/' + $scope.host);
        $scope.$apply();
      }).modal('hide');
    };
}

addImageController.$inject = ['$scope', '$routeParams', '$location', 'dockerService', 'instanceModel'];
module.exports = addImageController;
