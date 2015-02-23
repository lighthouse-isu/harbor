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

describe('userService', function () {
    var http,
        configService,
        userService;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');

        angular.mock.inject(function (_$httpBackend_, _configService_, _userService_) {
            http = _$httpBackend_;
            configService = _configService_;
            userService = _userService_;
        });
    });

    it('should list users', function () {
        http.expect('GET',
            configService.api.base + 'users/list').respond('');

        userService.getUsers();
        http.flush();
    });
});
