/*
 * beaconService
 * Management of Lighthouse beacons
 */
function beaconService($http, actions, flux, configService, alertService) {
    'use strict';

    function getBeacons() {
        var request = [configService.api.base, 'beacons/', 'list'].join('');
        $http.get(request).then(
            // success
            function (response) {
                flux.dispatch(actions.listBeacons, {'response': response.data});
            },
            // error
            function (response) {
                alertService.create({
                    message: response.data,
                    type: 'danger'
                });
            }
        );
    }

    function createBeacon(beacon) {
        var request = [configService.api.base, 'beacons/', 'create'].join('');
        $http.post(request, beacon).then(
            // success
            function (response) {
                flux.dispatch(actions.addBeacon, beacon);
                alertService.create({
                  message: 'Successfully created beacon!',
                  type: 'success'
                });
            },
            // error
            function (response) {
                alertService.create({
                    message: response.data,
                    type: 'danger'
                });
            }
        );
    }

    return {
        'getBeacons': getBeacons,
        'createBeacon': createBeacon
    };
}

beaconService.$inject = ['$http', 'actions', 'flux', 'configService', 'alertService'];
module.exports = beaconService;
