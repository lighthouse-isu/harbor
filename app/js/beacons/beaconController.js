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

/*
 * beaconController
 * Main beacon view control.
 */
function beaconController($scope, beaconModel, instanceModel, beaconService, instanceService) {
    'use strict';

    $scope.beacon = {instances: [
        {
            Name: 'boot2docker',
            InstanceAddres: '192.168.59.103:2375/v1.12',
            CanAccessDocker: true
        }
    ]};
    $scope.instances = [];
    $scope.beacons = [];
    beaconService.getBeacons();

    $scope.$listenTo(beaconModel, function() {
        $scope.beacons = beaconModel.getBeacons();
    });

    $scope.$listenTo(instanceModel, function () {
        $scope.instances = instanceModel.getInstances();
    });

    $scope.injectInstances = function (beacon) {
        // beaconService.refreshBeacon(beacon);
        instanceService.getInstances(beacon);
    };

    $scope.create = function (beacon) {
        beaconService.createBeacon({
            address: beacon.address,
            token: beacon.token
        });

        $scope.beacon.address = '';
        $scope.beacon.token = '';
    };
}

beaconController.$inject = ['$scope', 'beaconModel', 'instanceModel', 'beaconService', 'instanceService'];
module.exports = beaconController;
