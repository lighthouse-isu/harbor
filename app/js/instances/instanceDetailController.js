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
    instanceService.getInstances();

    // State event listeners
    $scope.$listenTo(instanceModel, function () {
        $scope.containers = instanceModel.getContainers();
        $scope.images = instanceModel.getImages();
        $scope.instance = _.find(instanceModel.getInstances(), {name: $routeParams.host});
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

    $scope.inspect = function (id) {
        dockerService.containers.inspect(
            $scope.instance.name, id);
    };
}

instanceDetailController.$inject = ['$scope', '$routeParams', 'dockerService', 'instanceModel', 'instanceService'];
module.exports = instanceDetailController;
