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

describe('dockerService.containers', function () {
    var http,
        configService,
        dockerService;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');

        angular.mock.inject(function (_$httpBackend_, _configService_, _dockerService_) {
            http = _$httpBackend_;
            configService = _configService_;
            dockerService = _dockerService_;
        });
    });

    it('should uri encode host', function () {
        http.expect('GET',
            configService.api.base + 'd/host%40com/containers/json').respond('');

        dockerService.d('containers.list', {
            host: 'host@com'
        });

        http.flush();
    });

    it('should handle endpoints with ids', function () {
        http.expect('GET',
            configService.api.base + 'd/host/containers/id/json').respond('');

        dockerService.d('containers.inspect', {
            host: 'host',
            id: 'id'
        });

        http.flush();
    });

    it('should handle endpoints without query parameters', function () {
        http.expect('GET',
            configService.api.base + 'd/host/containers/json').respond('');

        dockerService.d('containers.list', {
            host: 'host'
        });

        http.flush();
    });

    it('should handle endpoints with query parameters', function() {
        http.expect('GET',
            configService.api.base + 'd/host/containers/json?all=true&size=true').respond('');

        dockerService.d('containers.list', {
            host: 'host',
            query: {
                all: true,
                size: true
            }
        });

        http.flush();
    });

    it('should handle endpoints with body data', function () {
        http.expect('POST',
            configService.api.base + 'd/host/containers/create', {'Payload': {'some': 'data'}}).respond('');

        dockerService.d('containers.create', {
            host: 'host',
            data: { 'some': 'data' }
        });

        http.flush();
    });

    it('should handle endpoints with both body data and query parameters', function () {
        http.expect('POST',
            configService.api.base + 'd/host/containers/create?name=test', {'Payload': {'some': 'data'}}).respond('');

        dockerService.d('containers.create', {
            host: 'host',
            query: { 'name': 'test' },
            data: { 'some': 'data' }
        });
    });

});

