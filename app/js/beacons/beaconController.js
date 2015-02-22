/*
 * beaconController
 * Main beacon view control.
 */
function beaconController($scope, beaconModel, beaconService) {
    'use strict';

    $scope.beacon = {};
    $scope.beacons = {};
    beaconService.getBeacons();

    $scope.$listenTo(beaconModel, function() {
        $scope.beacons = beaconModel.getBeacons();
    });

    $scope.create = function (beacon) {
        beaconService.createBeacon({
          address: beacon.address,
          token: beacon.token
        });

        $scope.beacon.address = '';
        $scope.beacon.token = '';
    };
}

beaconController.$inject = ['$scope', 'beaconModel', 'beaconService'];
module.exports = beaconController;
