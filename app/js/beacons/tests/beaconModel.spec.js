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

describe('beaconModel', function () {

    var _ = require('lodash');
    var actions,
        flux,
        beaconModel;

    // Test data
    var beacons = [
        { Alias: 'test0', Address: '192.168.1.0' },
        { Alias: 'test1', Address: '192.168.1.1' }
    ];

    beforeEach(function () {
        angular.mock.module('lighthouse.app');
        angular.mock.inject(function (_actions_, _flux_, _beaconModel_) {
            actions = _actions_;
            flux = _flux_;
            beaconModel = _beaconModel_;
        });
    });

    it('should store beacons by a sequential ID', function () {
        flux.dispatch(actions.listBeacons, {'response': beacons});

        var expected = {
            0: beacons[0],
            1: beacons[1]
        };

        expect(beaconModel.getBeacons()).toEqual(expected);
    });

    it('should attach the generated ID to the beacon info model', function () {
        flux.dispatch(actions.listBeacons, {'response': beacons});

        _.forEach(beaconModel.getBeacons(), function (b) {
            expect(b.id).toBeDefined();
        });
    });

});
