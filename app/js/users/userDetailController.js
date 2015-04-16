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

var _ = require('lodash');

function userDetailController($scope, $routeParams, configService, flux, userModel, userService, beaconModel, beaconService) {
    'use strict';

    // init
    $scope.user = { Email: $routeParams.email };
    $scope.new = {
        Email: $routeParams.email,
        AuthLevel: '',
        Password: '',
        Beacons: {}
    };

    $scope.roles = configService.roles;
    $scope.beacons = {};

    // Form control / validation
    $scope.submitting = false;
    $scope.form = { submitted: false };

    userService.getUser($scope.user.Email);
    beaconService.getBeacons();

    // State event listeners
    $scope.$listenTo(userModel, function () {
        $scope.user = userModel.getUser();
        _.forEach(configService.roles, function (role) {
            if ($scope.user.AuthLevel == role.AuthLevel) {
                $scope.user.Role = role.DisplayName;
            }
        });
        console.log($scope.user);
    });

    $scope.$listenTo(beaconModel, function () {
        $scope.beacons = beaconModel.getBeacons();
    });

    $scope.open = function () {
        $scope.submitting = true;
    };

    $scope.close = function () {
        $scope.submitting = false;
        $scope.form.submitted = false;
        $scope.new.AuthLevel = '';
        $scope.new.Password = '';
        $scope.new.Beacons = {};
    };

    $scope.edit = function () {
        if ($scope.userForm.$valid) {
            var newUser = { Email: $scope.user.Email };
            if ($scope.new.AuthLevel) {
                newUser.AuthLevel = parseInt($scope.new.AuthLevel);
            }
            if ($scope.new.Password) {
                newUser.Password = $scope.new.Password;
            }
            if ($scope.new.Beacons) {
                newUser.Beacons = $scope.new.Beacons;
            }
            //userService.editUser($scope.user.Email, newUser);
            console.log($scope.new);

            $scope.close();
        }
    };
}

userDetailController.$inject = ['$scope', '$routeParams', 'configService', 'flux', 'userModel', 'userService', 'beaconModel', 'beaconService'];
module.exports = userDetailController;
