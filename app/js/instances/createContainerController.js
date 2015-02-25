var _ = require('lodash');

function createContainerController($scope, $routeParams, $location, dockerService, instanceModel) {
    'use strict';
    $scope.host = $routeParams.host;

    dockerService.images.list($scope.host, null);

    $scope.$listenTo(instanceModel, function () {
        $scope.images = instanceModel.getImages();
        $scope.selectedImage = $scope.images[0];
    });

    $scope.enviromentVariables = [];
    $scope.enviromentInput = "";
    $scope.cmdInput = "";

    $scope.addEnviromentVar = function(event) {
      if ((event.which !== 13 && event.type === "keypress") || $scope.enviromentInput === "") {
        return;
      }
      if (! _.include($scope.enviromentVariables, $scope.enviromentInput)) {
        $scope.enviromentVariables.unshift($scope.enviromentInput);
      }
      $scope.enviromentInput = "";
    };

    $scope.removeEnviromentVar = function(enviromentVariable) {
      _.pull($scope.enviromentVariables, enviromentVariable);
    };

    $scope.createContainer = function() {
      var data = JSON.stringify({
        'Env': $scope.enviromentVariables,
        'Image': $scope.selectedImage.RepoTags[0],
        'WorkingDir': $scope.workingDir,
        'Cmd': $scope.cmdInput.split(' ')
      });

      dockerService.containers.create($scope.host, null, data);

      $location.path('/instances/' + $scope.host);
    };
}

createContainerController.$inject = ['$scope', '$routeParams', '$location', 'dockerService', 'instanceModel'];
module.exports = createContainerController;
