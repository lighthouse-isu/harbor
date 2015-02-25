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

    function refreshBeacon(beacon) {
        var request = [configService.api.base, 'beacons/', 'refresh/', beacon.address].join('');
        $http.put(request).then(
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
