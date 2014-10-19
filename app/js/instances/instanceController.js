/*
 * instanceController
 * Main instance view control.
 */
function instanceController($scope, instanceService) {
    'use strict';

    instanceService.getInstances().then(
        // success
        function (instances) {
            $scope.message = instances;
        },
        // error
        function (response) {

        }
    );
}

instanceController.$inject = ['$scope', 'instanceService'];
module.exports = instanceController;