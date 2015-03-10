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

var _ = require('lodash');

function createContainerController($scope, $routeParams, $location, alertService, dockerService, instanceModel) {
    'use strict';
    $scope.host = $routeParams.host;

    dockerService.images.list($scope.host, null);

    $scope.$listenTo(instanceModel, function () {
      $scope.images = _.map(instanceModel.getImages(), function(image) {

        image.Tags = _.filter(image.RepoTags, function(repoTag) {
          return repoTag !== '<none>:<none>';
        }).join(', ');

        return image;
      });

      $scope.images = _.filter($scope.images, function(image) {
        return image.Tags !== '';
      });

      $scope.selectedImage = $scope.images[0];
    });

    $scope.enviromentVariables = [];
    $scope.enviromentInput = "";
    $scope.cmdInput = "";

    $scope.addEnviromentVar = function(event) {
      // ignore all other keyboard input other than the "Enter" key
      if ((event.which !== 13 && event.type === "keypress") || $scope.enviromentInput === "") {
        return;
      }

      if (! _.include($scope.enviromentVariables, $scope.enviromentInput)) {
        $scope.enviromentVariables.unshift($scope.enviromentInput);
      }
      $scope.enviromentInput = "";

      event.preventDefault();
    };

    $scope.removeEnviromentVar = function(enviromentVariable) {
      _.pull($scope.enviromentVariables, enviromentVariable);
    };

    $scope.submit = function() {
      if ($scope.containerForm.$valid) {
        var data = {
          'Env': $scope.enviromentVariables,
          'Image': $scope.selectedImage.RepoTags[0],
          'WorkingDir': $scope.workingDir,
          'Cmd': $scope.cmdInput.split(' ')
        };

        dockerService.containers.create($scope.host, null, data);
        $location.path('/instances/' + $scope.host);
      }
      else {
        $scope.containerForm.submitted = true;
        var message = 'There was an error with your submission.';

        if ($scope.containerForm.name.$error.required) {
          message = 'Please provide an application name for this container.';
        }

        alertService.create({
          message: message,
          type: 'danger',
          timeout: 3
        });
      }
    };
}

createContainerController.$inject = ['$scope', '$routeParams', '$location', 'alertService', 'dockerService', 'instanceModel'];
module.exports = createContainerController;
