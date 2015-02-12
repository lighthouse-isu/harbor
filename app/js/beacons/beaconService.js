/*
 * beaconService
 * Management of Lighthouse beacons
 */
function beaconService($http, actions, flux, configService) {
    'use strict';

    function createBeacon(beacon) {
        var request = [configService.api.base, 'beacons/', 'create'].join('');
        $http.post(request, beacon).then(
            // success
            function (response) {
                flux.dispatch(actions.createBeacon, response.data);
            },
            // error
            function (response) {
                // TODO flux.dispatch(actions.error, ...);
                console.log('beaconService.createBeacon() error: ' + response);
            }
        );
    }

    return {
        'createBeacon': createBeacon
    };
}

beaconService.$inject = ['$http', 'actions', 'flux', 'configService'];
module.exports = beaconService;
