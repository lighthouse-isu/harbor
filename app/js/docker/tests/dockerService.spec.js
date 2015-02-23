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

        dockerService.containers.list('host@com');
        http.flush();
    });

    it('should list containers', function () {
        // testing route is created as expected
        http.expect('GET',
            configService.api.base + 'd/host/containers/json').respond('');

        dockerService.containers.list('host');
        http.flush();
    });

    it('should list containers with query parameters', function() {
        http.expect('GET',
            configService.api.base + 'd/host/containers/json?all=true&size=true').respond('');

        dockerService.containers.list('host', null, {
            all: true,
            size: true
        });
        http.flush();
    });

    it('should start a container', function () {
        http.expect('POST',
            configService.api.base + 'd/host/containers/id/start').respond('');

        dockerService.containers.start('host', 'id');
        http.flush();
    });

    it('should stop a container', function () {
        http.expect('POST',
            configService.api.base + 'd/host/containers/id/stop').respond('');

        dockerService.containers.stop('host', 'id');
        http.flush();
    });

    it('should restart a container', function () {
        http.expect('POST',
            configService.api.base + 'd/host/containers/id/restart').respond('');

        dockerService.containers.restart('host', 'id');
        http.flush();
    });

    it('should pause a container', function () {
        http.expect('POST',
            configService.api.base + 'd/host/containers/id/pause').respond('');

        dockerService.containers.pause('host', 'id');
        http.flush();
    });

    it('should unpause a container', function () {
        http.expect('POST',
            configService.api.base + 'd/host/containers/id/unpause').respond('');

        dockerService.containers.unpause('host', 'id');
        http.flush();
    });

});

