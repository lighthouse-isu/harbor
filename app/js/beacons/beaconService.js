/*
 * beaconService
 * Management of Lighthouse beacons
 */
function beaconService($http, actions, flux, configService, alertService) {
    'use strict';

    function createBeacon(beacon) {
        var request = [configService.api.base, 'beacons/', 'create'].join('');
        $http.post(request, beacon).then(
            // success
            function (response) {
                flux.dispatch(actions.createBeacon, {'response': response.data});
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
        'createBeacon': createBeacon
    };
}

beaconService.$inject = ['$http', 'actions', 'flux', 'configService', 'alertService'];
module.exports = beaconService;
