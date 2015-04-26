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

var _ = require('lodash');

function deployService($http, actions, flux, configService) {
    'use strict';

    // Default $http config
    function _config() {
        return {
            method: 'GET',
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    function _url(request) {
        var base = [configService.api.base, 'applications/create'].join('');

        if (request.query) {
            return base + '?' + $.param(request.query);
        }

        return base;
    }

    /* 
     * create()
     * Endpoint: /applications/create
     * Dispatches: deployStream- prefixed actions
     *
     * @param {object, required} request
     * Allowed keys:
     *      {object, required} body: body data for POST to endpoint
     *      {object} query: map of query params to endpoint
     */
    function create(request) {
        oboe({
            method: 'POST',
            url: _url(request),
            body: request.body || {}
        })
        .start(function () {
            flux.dispatch(actions.deployStreamStart, request.body);
        })
        .node('{Status}', function (status) {
            flux.dispatch(actions.deployStreamUpdate, status);
        })
        .fail(function (error) {
            flux.dispatch(actions.deployStreamFail, error);
        });
    }

    /* 
     * apps()
     * Endpoint: /applications/list
     * Dispatches: actions.appList
     */
    function apps() {
        var _url = [configService.api.base, 'applications/list'].join('');
        var config = _.assign(_config(), {url: _url});

        $http(config).then(
            // success
            function (response) {
                flux.dispatch(actions.appList,
                    {'response': response, 'data': response.data});
            }
        );
    }

    /*
     * detail()
     * Endpoint: /applications/list/{id}
     * Dispatches: actions.appDetail
     *
     * @param {number, required} id
     * @param {object, optional} query - query params
     */
    function detail(id, query) {
        var _url = [configService.api.base, 'applications/list/', id].join('');
        var config = _.assign(_config(), {
            params: query || {},
            url: _url
        });

        $http(config).then(
            // success
            function (response) {
                flux.dispatch(actions.appDetail,
                    {'id': id, 'data': response.data, 'response': response});
            }
        );
    }

    return {
        'apps': apps,
        'detail': detail,
        'create': create
    };
}

deployService.$inject = ['$http', 'actions', 'flux', 'configService'];
module.exports = deployService;