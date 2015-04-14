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

describe('deployModel', function () {

    var _ = require('lodash');
    var actions,
        flux,
        deployModel;

    function progress(_status, _method, _endpoint, _message, _code, _instance, _item, _total) {
        return {
            Status: _status,
            Method: _method,
            Endpoint: _endpoint,
            Message: _message,
            Code: _code,
            Instance: _instance,
            Item: _item,
            Total: _total
        };
    }

    beforeEach(function () {
        angular.mock.module('lighthouse.app');
        angular.mock.inject(function (_actions_, _flux_, _deployModel_) {
            actions = _actions_;
            flux = _flux_;
            deployModel = _deployModel_;
        });
    });

    it('should save instances upon stream start', function () {
        var instances = ['inst0', 'inst1', 'inst2'];

        flux.dispatch(actions.deployStreamStart, instances);
        expect(deployModel.instances()).toEqual(instances);
    });

    it('should save in progress actions', function () {
        var start0 = progress('Starting', 'method', 'some/action0', 'message', 0, '', 0, 3);
        var start1 = progress('Starting', 'method', 'some/action1', 'message', 0, '', 0, 3);

        flux.dispatch(actions.deployStreamUpdate, start0);
        flux.dispatch(actions.deployStreamUpdate, start1);

        expect(deployModel.inProgress()).toEqual([start0, start1]);
    });

    it('should move in progress actions to complete', function () {
        var start = progress('Starting', 'method', 'some/action0', 'message', 0, '', 0, 1);
        var ok = progress('OK', 'method', 'some/action0', 'message', 200, 'inst0', 0, 1);
        var complete = progress('Complete', 'method', 'some/action0', 'message', 0, '', 1, 1);

        flux.dispatch(actions.deployStreamStart, ['inst0']);

        flux.dispatch(actions.deployStreamUpdate, start);
        expect(deployModel.inProgress()).toEqual([start]);

        flux.dispatch(actions.deployStreamUpdate, ok);
        expect(deployModel.inProgress()).toEqual([start]);

        flux.dispatch(actions.deployStreamUpdate, complete);
        expect(deployModel.inProgress()).toEqual([]);
        expect(deployModel.completed()).toEqual([complete]);
    });

    it('should save raw stream logs', function () {
        var a = progress('Starting', 'method', 'some/action0', 'message', 0, '', 0, 1);
        var b = progress('OK', 'method', 'some/action0', 'message', 0, 'inst0', 0, 1);
        var c = progress('Complete', 'method', 'some/action0', 'message', 0, '', 1, 1);

        flux.dispatch(actions.deployStreamUpdate, a);
        flux.dispatch(actions.deployStreamUpdate, b);
        flux.dispatch(actions.deployStreamUpdate, c);

        expect(deployModel.log()).toEqual([a, b, c]);
    });

    it('should panic on missing status objects', function () {
        // Missing instance status object
        var a = progress('Starting', 'method', 'some/action0', 'message', 0, '', 0, 2);
        var b = progress('OK', 'method', 'some/action0', 'message', 0, 'inst0', 0, 2);
        var c = progress('Complete', 'method', 'some/action0', 'message', 0, '', 2, 2);

        flux.dispatch(actions.deployStreamStart, ['inst0', 'inst1']);
        flux.dispatch(actions.deployStreamUpdate, a);
        flux.dispatch(actions.deployStreamUpdate, b);
        flux.dispatch(actions.deployStreamUpdate, c);

        expect(deployModel.state().good).toBe(false);
        expect(deployModel.state().errorMessage).not.toEqual('');
    });
});
