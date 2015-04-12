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
  * deploy/deployService.js
  * Main entry point for the deploy / application API.
  * Sends application mgmt requests and aggregates / dispatches streaming updates.
  */

var oboe = require('oboe');

function deployService($http, actions, flux, configService) {
    'use strict';

    function _url(request) {
        var base = [configService.api.base, 'applications/create'].join('');

        if (request.query) {
            return base + '?' + $.param(request.query);
        }

        return base;
    }

    /* create()
     * Endpoint: /applications/create
     *
     * @param {object, required} request
     * Allowed keys:
     *      {object, required} data: body data for POST to endpoin
     *      {object} query: map of query params to endpoint
     */
    function create(request) {
        var stream = oboe({
            method: 'POST',
            url: _url(request),
            body: request.data || {},
            headers: {'Content-Type': 'application/json'}
        });

        stream.start(function () {
            console.log('stream started....');
            flux.dispatch('deployStream.start', request.Instances);
        });

        stream.node('{Status}', function (status) {
            console.log(status);
            flux.dispatch('deployStream.update', status);
        });

        stream.fail(function (error) {
            flux.dispatch('deployStream.fail', error);
        });
    }

    return {
        'create': create
    };
}

deployService.$inject = ['$http', 'actions', 'flux', 'configService'];
module.exports = deployService;