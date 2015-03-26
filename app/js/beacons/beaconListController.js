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
 * beaconListController
 * Main beacon view control.
 */
function beaconListController($scope, beaconModel, instanceModel, alertService, beaconService) {
    'use strict';
    // Init
    beaconService.getBeacons();

    // New beacon parameters
    $scope.new = {
        alias: '',
        address: '',
        token: ''
    };

    $scope.instances = [];
    $scope.beacons = [];

    // Form control / validation
    $scope.submitting = false;
    $scope.form = { submitted: false };

    $scope.$listenTo(beaconModel, function() {
        $scope.beacons = beaconModel.getBeacons();
        $scope.instances = beaconModel.getInstances();
    });

    // Add beacon form control
    $scope.open = function () {
        $scope.submitting = true;
    };

    $scope.close = function () {
        $scope.submitting = false;
        $scope.form.submitted = false;
        $scope.new.alias = '';
        $scope.new.address = '';
        $scope.new.token = '';
    };

    $scope.create = function () {
        if ($scope.beaconForm.$valid) {
            beaconService.createBeacon({
                Alias: $scope.new.alias,
                Address: $scope.new.address,
                Token: $scope.new.token
            });

            $scope.close();
        }
        else {
            var message = '';
            if ($scope.beaconForm.alias.$error.required) {
                message = 'Please provide a beacon alias.';
            }
            else if ($scope.beaconForm.address.$error.required) {
                message = 'Please provide a beacon address.';
            }
            else if ($scope.beaconForm.token.$error.required) {
                message = 'Please provide a beacon token.';
            }

            alertService.create({
                message: message,
                type: 'danger',
                timeout: 2
            });

            $scope.form.submitted = true;
        }
    };
}

beaconListController.$inject = ['$scope', 'beaconModel', 'instanceModel', 'alertService', 'beaconService'];
module.exports = beaconListController;
