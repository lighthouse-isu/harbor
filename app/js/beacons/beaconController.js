/*
 * beaconController
 * Main beacon view control.
 */
function beaconController($scope, beaconModel, beaconService) {
    'use strict';

    $scope.create = function (beacon) {
        beaconService.createBeacon(beacon);
    }

}

beaconController.$inject = ['$scope', 'beaconService'];
module.exports = beaconController;
