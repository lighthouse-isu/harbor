// auth/authService.js

/*
 * authService
 * Manages login/logout and auth status.
 */
function authService($rootScope, $q, Restangular) {
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

        Restangular.all('login').post(auth).then(
            // success
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
                }
            }
            // NOTE
            // error callback will not execute on failed login
            // as server returns 200 OK in either case
        );

        return deferred.promise;
    }

    /*
     * logout()
     * Invalidate current session.
     */
    function logout() {
        Restangular.one('logout').get().then(
            // success
            function (response) {

            },
            // error
            function (response) {

            }
        );
    }

    /*
     * isLoggedIn()
     * @return [boolean]
     */
    function isLoggedIn() {
        return $rootScope.user ? true : false;
    }

    return {
        'login': login,
        'logout': logout,
        'isLoggedIn': isLoggedIn
    };
}

authService.$inject = ['$rootScope', '$q', 'Restangular'];
module.exports = authService;