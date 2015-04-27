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

function deployUpdateController($scope, beaconModel, beaconService, deployService) {
    'use strict';

    // TODO attempt to fix issue with beaconModel not populated on refresh.
    // proper solution would be to define some kind of data dependency between models
    // and controllers.
    // 
    // // Load data deps
    // if (_.isEmpty(beaconModel.getBeacons())) {
    //     console.log('loading beacons!');
    //     beaconService.getBeacons();
    //     console.log(beaconModel.getBeacons());
    //     _.forEach(beaconModel.getBeacons(), function (beacon) {
    //         console.log('fetching instances for beacon');
    //         beaconService.getInstances(beacon);
    //     });
    // }

    function _buildInstanceList(deployInstances) {
        var _instances = [];

        _.forEach(beaconModel.getBeacons(), function (beacon) {
            _.forEach(beaconModel.getInstances(beacon), function (instance) {
                if (instance.CanAccessDocker) {
                    if (_.includes(deployInstances, instance.InstanceAddress)) {
                        _instances.push(_.assign(instance, {'selected': true}));
                    }
                    else {
                        _instances.push(_.assign(instance, {'selected': false}));
                    }
                }
            });
        });

        $scope.instances = _instances;
        currentInstances = _.where(_instances, {'selected': true});
    }

    // Recent deploy object
    $scope.recent = {};
    $scope.id = 0;
    $scope.createCommand = '';
    $scope.query = {
        'restart': false
    };
    // Instance selection
    $scope.instances = [];
    // UI state
    $scope.jsonError = false;

    // Instance mgmt
    var currentInstances = [];
    var toAdd = [];
    var toRemove = [];

    // Init
    $scope.$on('deploy.update', function (event, app) {
        $scope.id = app.id;
        $scope.name = app.name;
        $scope.recent = app.recent;
        // four spaces
        $scope.createCommand = JSON.stringify($scope.recent.Command, null, '    ');
        _buildInstanceList(app.recent.Instances);
    });

    $scope.updateCommand = function () {
        try {
            JSON.parse($scope.createCommand, null, '    ');
            $scope.jsonError = false;
        } catch (e) {
            $scope.jsonError = true;
        }
    };

    $scope.updateInclude = function (instance) {
        if (_.includes(currentInstances, instance)) {
            if (instance.selected) {
                toRemove.push(instance);
            }
            else {
                toRemove = _.without(toRemove, instance);
            }
        }
        else {
            if (instance.selected) {
                toAdd = _.without(toAdd, instance);
            }
            else {
                toAdd.push(instance);
            }
        }

        instance.selected = !instance.selected;
    };

    $scope.updateApp = function () {
        var command = {};
        try {
            command = JSON.parse($scope.createCommand);
            $scope.jsonError = false;
        } catch (e) {
            $scope.jsonError = true;
            return;
        }

        var update = {
            'Command': command,
            'Add': _.map(toAdd, function (inst) { return inst.InstanceAddress; }),
            'Remove': _.map(toRemove, function (inst) { return inst.InstanceAddress; })
        };

        deployService.update(
            $scope.id, $scope.name, update, $scope.query)
            .then(function () {
                deployService.apps();
                deployService.detail($scope.id);
            });

        toRemove = [];
        toAdd = [];
    };
}

deployUpdateController.$inject = ['$scope', 'beaconModel', 'beaconService', 'deployService'];
module.exports = deployUpdateController;