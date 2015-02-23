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

describe('beaconService', function () {
    var http,
        configService,
        beaconService;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');

        angular.mock.inject(function (_$httpBackend_, _configService_, _beaconService_) {
            http = _$httpBackend_;
            configService = _configService_;
            beaconService = _beaconService_;
        });
    });

    it('should list beacons', function() {
        http.expect('GET',
            configService.api.base + 'beacons/list').respond('');

        beaconService.getBeacons();
        http.flush();
    });

    it('should create beacon', function () {
        http.expect('POST',
            configService.api.base + 'beacons/create').respond('');

        var beacon = {
          Address: '127.0.0.1:5000',
          Token: 'token',
          Users: ['user@example.com', 'user2@example.com']
        };

        beaconService.createBeacon(beacon);
        http.flush();
    });
});
