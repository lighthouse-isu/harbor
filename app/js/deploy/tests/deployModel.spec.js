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
        deployModel;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');
        angular.mock.inject(function (_actions_, _flux_, _deployModel_) {
            actions = _actions_;
            flux = _flux_;
            deployModel = _deployModel_;
        });
    });

    it('should return a list of instances involved in the stream', function() {

    });

    it('should update the current action', function () {

    });

    it('should add warning messages to an instance', function () {

    });

});
