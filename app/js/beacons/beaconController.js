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

    // New beacon parameters
    $scope.new = {
        alias: '',
        address: '',
        token: ''
    };

    $scope.instances = [];
    $scope.beacons = [];
    
    beaconService.getBeacons();

    $scope.$listenTo(beaconModel, function() {
        $scope.beacons = beaconModel.getBeacons();
        $scope.instances = beaconModel.getInstances();
    });

    $scope.injectInstances = function (beacon) {
        instanceService.getInstances(beacon);
    };

    $scope.create = function () {
        beaconService.createBeacon({
            Alias: $scope.new.alias,
            Address: $scope.new.address,
            Token: $scope.new.token
        });

        $scope.new.alias = '';
        $scope.new.address = '';
        $scope.new.token = '';
    };
}

beaconController.$inject = ['$scope', 'beaconModel', 'instanceModel', 'beaconService', 'instanceService'];
module.exports = beaconController;
