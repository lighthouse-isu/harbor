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

/*
 * userService
 * Management of Lighthouse users
 */
function userService($http, actions, flux, configService, alertService) {
    'use strict';

    function getUsers() {
        var request = [configService.api.base, 'users/list'].join('');
        $http.get(request).then(
            // success
            function (response) {
                flux.dispatch(actions.listUsers, {'response': response.data});
            }
        );
    }

    function getUser(email) {
        var request = [configService.api.base, 'users/', email].join('');
        $http.get(request).then(
            // success
            function (response) {
                flux.dispatch(actions.getUser, {'response': response.data});
            }
        );
    }

    function createUser(user) {
        var request = [configService.api.base, 'users/create'].join('');

        $http.post(request, user).then(
            // success
            function (response) {
                flux.dispatch(actions.addUser, user);

                alertService.create({
                    message: 'Successfully created user!',
                    type: 'success'
                });
            }
        );
    }

    function editUser(email, user) {
        var request = [configService.api.base, 'users/', email].join('');

        $http.put(request, user).then(
            // success
            function (response) {
                getUser(email);

                alertService.create({
                    message: 'Successfully updated user!',
                    type: 'success'
                });
            }
        );
    }

    return {
        'createUser': createUser,
        'getUser': getUser,
        'getUsers': getUsers,
        'editUser': editUser
    };
}

userService.$inject = ['$http', 'actions', 'flux', 'configService', 'alertService'];
module.exports = userService;
