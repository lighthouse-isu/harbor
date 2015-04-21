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
 * auth/authService.js
 * Manages API authentication.
 */

function authService($http, actions, flux, appModel, alertService, configService) {
    'use strict';

    /*
     * login()
     * Request a session. Success dispatches authLogin action.
     *
     * @param auth {object} keys (Email, Password)
     */
    function login(auth) {
        var request = [configService.api.base, 'login'].join('');

        // Only act if not logged in
        if (!appModel.isLoggedIn()) {
            $http.post(request, auth).then(
                // success
                function (response) {
                    flux.dispatch(actions.authLogin, {email: auth.Email});

                    request = [configService.api.base, 'users/', auth.Email].join('');
                    $http.get(request).then(
                        // success
                        function (response) {
                            flux.dispatch(actions.getCurrentUser, {'response': response.data});
                        }
                    );
                }
            );
        }
    }

    /*
     * logout()
     * Invalidate current session.
     */
    function logout() {
        var request = [configService.api.base, 'logout'].join('');

        // Only act if logged in
        if (appModel.isLoggedIn()) {
            $http.get(request).then(
                // success
                function (response) {
                    flux.dispatch(actions.authLogout);
                }
            );
        }
    }

    return {
        'login': login,
        'logout': logout
    };
}

authService.$inject = ['$http', 'actions', 'flux', 'appModel', 'alertService', 'configService'];
module.exports = authService;
