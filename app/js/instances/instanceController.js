/*
 * instanceController
 * Main instance view control.
 */
function instanceController($scope, instanceService) {
    'use strict';

    $scope.instances = {};

    instanceService.getInstances().then(
        // success
        function (instances) {
            $scope.instances = instances;
        },
        function (response) {
            console.log(response);
        }
    );

}

instanceController.$inject = ['$scope', 'instanceService'];
module.exports = instanceController;
