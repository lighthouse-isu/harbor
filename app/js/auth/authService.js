// auth/authService.js

/*
 * authService
 * Manages login/logout and auth status.
 */
function authService($rootScope, Restangular) {

    /*
     * login()
     * Request a session.
     * @param credentials: [object] keys (Email, Password)
     */
    function login(credentials) {
        if (!credentials.Email || !credentials.Password) {
            // error
            // resolve promise with an error?
        }

        Restangular.all('login').post(credentials).then(
            // success
            function (response) {
                
            },
            // error
            function (response) {

            }
        );
        // on success, resolve promise with success
        // on error, resolve promise with error
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
     * @return boolean
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

authService.$inject = ['$rootScope', 'Restangular'];
module.exports = authService;