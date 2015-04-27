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

function deployController($scope, beaconModel, deployService, dockerTemplate) {
    'use strict';

    function _buildInstanceList() {
        var _instances = [];
        _.forEach(beaconModel.getBeacons(), function (beacon) {
            _.forEach(beaconModel.getInstances(beacon), function (instance) {
                _instances.push(_.assign(instance, {'selected': false}));
            });
        });

        $scope.instances = _instances;
    }

    // Generated list of available instances for deployment
    $scope.instances = [];
    // Request components
    $scope.appName = '';
    $scope.appImage = '';
    $scope.appCmd = '';
    // four spaces
    $scope.rawCommand = JSON.stringify(dockerTemplate.containerCreate, null, '    ');
    // Query params
    $scope.query = {
        'forcePull': false,
        'start': false
    };
    // Tracks parsing error
    $scope.jsonError = false;
    // Init
    _buildInstanceList();

    $scope.$listenTo(beaconModel, function () {
        _buildInstanceList();
    });

    // Triggered on click to toggle instance's include state
    $scope.toggleInclude = function (instance) {
        instance.selected = !instance.selected;
    };

    // Trigged on change event in command text area
    $scope.updateCommand = function () {
        // Update request command, using raw command to settle conflicts
        var command = {};

        try {
            command = JSON.parse($scope.rawCommand);
            $scope.jsonError = false;
        } catch(e) {
            $scope.jsonError = true;
            return;
        }

        // Update with user input
        command.Cmd = $scope.appCmd;
        command.Image = $scope.appImage;
        $scope.rawCommand = JSON.stringify(command, null, '    ');
    };

    // Finalize the application deploy request object
    // and attempt the deployment.
    $scope.deploy = function () {
        var targets = _.map(_.where($scope.instances, {'selected': true}),
            function (instance) { return instance.InstanceAddress; });

        // Format container command for Docker consumption
        // (as an array of strings)
        var command = {};
        try {
            command = JSON.parse($scope.rawCommand);
            command.Cmd = _.without(command.Cmd.split(' '), '');
            $scope.jsonError = false;
        } catch (e) {
            $scope.jsonError = true;
            return;
        }

        deployService.create({
            body: {
                'Name': $scope.appName,
                'Command': command,
                'Instances': targets
            },
            query: $scope.query
        });
    };
}

deployController.$inject = ['$scope', 'beaconModel', 'deployService', 'dockerTemplate'];
module.exports = deployController;