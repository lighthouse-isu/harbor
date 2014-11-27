// auth/authService.js

/*
 * authService
 * Manages login/logout and auth status.
 */
function authService($rootScope, $q, Restangular, authEvents) {
    /*
     * getUser()
     * Return the global user [object].
     */
    function getUser() {
        return $rootScope.user;
    }

    /*
     * isLoggedIn()
     * @return [boolean]
     */
    function isLoggedIn() {
        return $rootScope.user ? true : false;
    }

    /*
     * login()
     * Request a session. Sets a user object at $rootScope
     * upon successful login.
     *
     * @param auth: [object] keys (Email, Password)
     * @return promise: (success, error)
     *      - success callback accepts user [object] with email key
     *      - error callback accepts reason [string]
     */
    function login(auth) {
        var deferred = $q.defer();

        if (isLoggedIn()) {
            deferred.resolve($rootScope.user);
        }
        else {
            Restangular.all('login').post(auth).then(
                function (response) {
                    if (response === 'false') {
                        deferred.reject('invalid email or password');
                    }
                    else {
                        var user = {
                            email: auth.Email
                        };

                        $rootScope.user = user;
                        deferred.resolve(user);

                        // fire event
                        $rootScope.$broadcast(authEvents.login);
                    }
                }
                // NOTE
                // error callback will not execute on failed login
                // as server returns 200 OK in either case
            );
        }

        return deferred.promise;
    }

    /*
     * logout()
     * Invalidate current session.
     *
     * @return promise: (success, error)
     *      - both callbacks may accept the response object returned from
     *        the initial /logout call
     */
    function logout() {
        var deferred = $q.defer();

        if (!isLoggedIn()) {
            deferred.resolve('logged out');
        }
        else {
            Restangular.one('logout').get().then(
                // success
                function (response) {
                    // invalidate user object
                    $rootScope.user = null;
                    deferred.resolve(response);

                    // fire event
                    $rootScope.$broadcast(authEvents.logout);
                },
                // error
                function (response) {
                    deferred.reject(response);
                }
            );
        }

        return deferred.promise;
    }

    return {
        'getUser': getUser,
        'isLoggedIn': isLoggedIn,
        'login': login,
        'logout': logout
    };
}

authService.$inject = ['$rootScope', '$q', 'Restangular', 'authEvents'];
module.exports = authService;