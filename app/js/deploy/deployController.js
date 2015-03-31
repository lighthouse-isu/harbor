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

function deployController($scope, beaconModel, dockerTemplate) {
    'use strict';

    // Generated list of available instances for deployment
    $scope.instances = [];
    // Request object
    $scope.request = {
        'Name': '',
        'Command': dockerTemplate.containerCreate,
        'Instances': []
    };

    $scope.$listenTo(beaconModel, function () {
        var _instances = [];
        _.forEach(beaconModel.getBeacons(), function (beacon) {
            _.forEach(beaconModel.getInstances(beacon), function (instance) {
                _instances.push(_.assign(instance, {'selected': false}));
            });
        });

        $scope.instances = _instances;
    });

    // Triggered on click to toggle instance's include state
    $scope.toggleInclude = function (instance) {
        instance.selected = !instance.selected;
    };

    // Finalize the application deploy request object
    // and attempt the deployment.
    $scope.deploy = function () {
        // var targets = _.filter($scope.instances, function (instance) {
        //     return instance.selected;
        // });
    };
}

deployController.$inject = ['$scope', 'beaconModel', 'dockerTemplate'];
module.exports = deployController;