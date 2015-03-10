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

var oboe = require('oboe');
var _ = require('lodash');

function addImageController($scope, $routeParams, dockerService, instanceModel, alertService) {
    'use strict';
    $scope.host = $routeParams.host;

    $scope.searchTerm = '';
    $scope.foundImages = [];
    $scope.searchIsLoading = false;

    $scope.allTags = true;
    $scope.imagesAreLoading = false;
    $scope.loadingImages = {};
    $scope.pullProgress = {
      'width': '0%'
    };

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

      $scope.imagesAreLoading = false;
      $scope.loadingImages = {};
      $scope.pullProgress = {
        'width': '0%'
      };
    };

    var parseStatusObject = function(item) {
      if (_.has(item.progressDetail, 'current') && _.has(item.progressDetail, 'total')) {
        $scope.pullProgress.width = 100 * item.progressDetail.current / item.progressDetail.total + '%';
      }

      if (_.startsWith(item.status, 'Pulling image ')) {
        $scope.loadingImages[item.id] = {
          'done': false,
          'name': item.status.split('(')[1].split(')')[0] // parse out tag name
        };
      } else if (_.startsWith(item.status, 'Download complete')) {
        if (_.has($scope.loadingImages, item.id)) {
          $scope.loadingImages[item.id].done = true;
        }
      }

      if (_.every(_.values($scope.loadingImages), 'done')) {
        $scope.imagesAreLoading = false;
        this.forget();
      }
      $scope.$apply();
    };


    $scope.pullImage = function(image) {
      var imageName = image.name;
      if (!$scope.allTags) {
        imageName = [image.name, $scope.imageTag].join(':');
      }

      $scope.imagesAreLoading = true;

      var url = [
        '/api/v0.2/d/', $scope.host, '/images/create?fromImage=', imageName
      ].join('');

      oboe({method: 'POST',url: url})
      .node('{progressDetail}', parseStatusObject)
      .node('{error}', function(item) {
        $scope.imagesAreLoading = false;
        this.forget();

        alertService.create({
            message: item.error,
            type: 'danger'
        });

        $scope.$apply();
      });
    };
}

addImageController.$inject = ['$scope', '$routeParams', 'dockerService', 'instanceModel', 'alertService'];
module.exports = addImageController;
