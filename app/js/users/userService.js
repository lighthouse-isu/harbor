/*
 * userService
 * Management of Lighthouse users
 */
function userService($http, actions, flux, configService, alertService) {
    'use strict';

    function getUsers() {
        var request = [configService.api.base, 'users/'].join('');
        $http.get(request).then(
            // success
            function (response) {
                flux.dispatch(actions.listUsers, {'response': response.data});
            },
            // error
            function (response) {
                alertService.create({
                    message: response.data,
                    type: 'danger'
                })
            }
        );
    }

    return {
        'getUsers': getUsers
    };
}

beaconService.$inject = ['$http', 'actions', 'flux', 'configService', 'alertService'];
module.exports = userService;
