/*
 * auth/authService.js
 * Manages API authentication.
 */

function authService($http, actions, flux, authModel, alertService, configService) {
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
        if (!authModel.isLoggedIn()) {
            $http.post(request, auth).then(
                // success
                function (reponse) {
                    flux.dispatch(actions.authLogin, {email: auth.Email});
                },
                // error
                function (response) {
                    alertService.create({
                        message: 'Invalid user name or password.',
                        type: 'danger'
                    });
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
        if (authModel.isLoggedIn()) {
            $http.get(request).then(
                // success
                function (response) {
                    flux.dispatch(actions.authLogout);
                },
                // error
                function (response) {
                    alertService.create({
                        message: 'Unable to logout - please check your connection.',
                        type: 'warning'
                    });
                }
            );
        }
    }

    return {
        'login': login,
        'logout': logout
    };
}

authService.$inject = ['$http', 'actions', 'flux', 'authModel', 'alertService', 'configService'];
module.exports = authService;