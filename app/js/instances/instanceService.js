/*
 * instanceService
 * Requests and manages information related to instance discovery.
 */
function instanceService($http, actions, flux, configService) {
    'use strict';

    function getInstances() {
        var request = [configService.api.base, 'provider/', 'vms'].join('');
        $http.get(request).then(
            // success
            function (response) {
                flux.dispatch(actions.listInstances, response.data);
            },
            // error
            function (response) {
                // TODO flux.dispatch(actions.error, ...);
                console.log('instanceService.getInstances() error: ' + response);
            }
        );
    }

    return {
        'getInstances': getInstances
    };
}

instanceService.$inject = ['$http', 'actions', 'flux', 'configService'];
module.exports = instanceService;
