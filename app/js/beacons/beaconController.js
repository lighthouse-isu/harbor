/*
 * beaconController
 * Main beacon view control.
 */
function beaconController($scope, beaconModel, beaconService) {
    'use strict';

    $scope.beacon = {users: []};
    $scope.beacons = {};
    beaconService.getBeacons();

    $scope.$listenTo(beaconModel, function() {
        $scope.beacons = beaconModel.getBeacons();
    });

    $scope.create = function (beacon) {
        beaconService.createBeacon(beacon);
    };

}

beaconController.$inject = ['$scope', 'beaconModel', 'beaconService'];
module.exports = beaconController;
