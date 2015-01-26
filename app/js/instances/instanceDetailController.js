/*
 * instanceDetailController
 * Main instance detailed view
 */

var _ = require('lodash');

function instanceDetailController($scope, $routeParams, containerService, instanceModel) {
    'use strict';

    // init
    $scope.containers = [];
    $scope.instance = $routeParams.host;
    containerService.list($scope.instance);

    // State event listeners
    $scope.$listenTo(instanceModel, function () {
        var containers = instanceModel.getContainers();

        _(containers).forEach(function (container) {
            container.Id = container.Id.slice(0, 6);
        });

        $scope.containers = containers;
    });
}

instanceDetailController.$inject = ['$scope', '$routeParams', 'containerService', 'instanceModel'];
module.exports = instanceDetailController;
