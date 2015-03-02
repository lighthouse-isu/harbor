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

describe('instanceModel', function () {

    var _ = require('lodash');
    var actions,
        flux,
        instanceModel;

    var containers = [{Id: 'one', a: 10, b: 100}, {Id: 'two', a: 20, b: 200}];

    beforeEach(function () {
        angular.mock.module('lighthouse.app');
        angular.mock.inject(function (_actions_, _flux_, _instanceModel_) {
            actions = _actions_;
            flux = _flux_;
            instanceModel = _instanceModel_;
        });
    });

    it('should store container summaries', function () {
        flux.dispatch(actions.listContainers, {response: containers});
        expect(instanceModel.getContainers()).toEqual(containers);
    });

    it('should store container details', function () {
        var detail = {Id: 'one', here: 'is', some: 'data'};
        flux.dispatch(actions.inspectContainer, {response: detail});
        expect(instanceModel.getContainer('one')).toEqual(detail);
    });
});
