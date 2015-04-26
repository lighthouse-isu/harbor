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
    // Request object
    $scope.request = {
        'Name': '',
        'Command': dockerTemplate.containerCreate,
        'Instances': []
    };
    // four spaces
    $scope.rawCommand = JSON.stringify($scope.request.Command, null, '    ');
    // Query params
    $scope.query = {
        'forcePull': false,
        'start': false
    };
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
        $scope.rawCommand = JSON.stringify($scope.request.Command, null, '    ');
    };

    // Finalize the application deploy request object
    // and attempt the deployment.
    $scope.deploy = function () {
        var targets = _.map($scope.instances, function (instance) {
            if (instance.selected)
                return instance.InstanceAddress;
        });

        // Format container command for Docker consumption
        // (as an array of strings)
        $scope.request.Command = JSON.parse($scope.rawCommand);
        $scope.request.Command.Cmd = _.without($scope.request.Command.Cmd.split(' '), '');

        deployService.create({
            body: _.assign($scope.request, {'Instances': targets}),
            query: $scope.query
        });
    };
}

deployController.$inject = ['$scope', 'beaconModel', 'deployService', 'dockerTemplate'];
module.exports = deployController;