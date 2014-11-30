/*
 * instanceDetailController
 * Main instance detailed view
 */

var _ = require('lodash');

function instanceDetailController($scope, instanceService, containerService) {
    'use strict';

    $scope.instance = {};
    $scope.containers = {};

    $scope.getInstance = function(host) {
        var instances = instanceService.getInstances();
        $scope.instance = _.find(instances, {'name': host});
        $scope.containers = containerService.list(host).then(
            // success
            function (containers) {
                $scope.containers = containers;
            },
            // error
            function (response) {
                console.log(response);
            }
        );
    }
}

instanceController.$inject = ['$scope', 'instanceService', 'containerService'];
module.exports = instanceDetailController;
