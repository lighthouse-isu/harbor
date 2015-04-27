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

var _ = require('lodash');

 /*
  * deploy/deployService.js
  * Main entry point for the deploy / application API.
  * Sends application mgmt requests and aggregates / dispatches streaming updates.
  *
  * Streaming endpoints:
  * Each dispatch to deployStreamStart must provide an object in the form:
  * {
  *    'appName': (string),
  *    'action': ('create', 'start', 'stop', 'revert', 'update')
  * }
  */
function deployService($http, $q, actions, flux, configService) {
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

    function _stream(method, name, action, url, body) {
        var d = $q.defer();

        oboe({
            'method': method,
            'url': url,
            'body': body || {}
        })
        .start(function () {
            flux.dispatch(actions.deployStreamStart, {
                'appName': name,
                'action': action
            });
        })
        .node('{Status}', function (status) {
            flux.dispatch(actions.deployStreamUpdate, status);
        })
        .done(function (complete) {
            d.resolve();
        })
        .fail(function (error) {
            flux.dispatch(actions.deployStreamFail, error);
            d.reject();
        });

        return d.promise;
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
        var url = [configService.api.base, 'applications/create'].join('');
        if (request.query) {
            url += ('?' + $.param(request.query));
        }

        return _stream('POST', request.body.Name, 'create', url, request.body);
    }

    /*
     * revert()
     * Endpoint: /applications/revert/{id}
     * Dispatches: deployStream- prefixed actions
     *
     * @param {number, required} id - target deployment id
     * @param {string, required} name - app name
     * @param {object, optional} query - query parameters object
     */
    function revert(id, name, query) {
        var url = [configService.api.base, 'applications/revert/', id].join('');
        if (query) {
            url += ('?' + $.param(query));
        }

        return _stream('PUT', name, 'revert', url);
    }

    /*
     * start()
     * Endpoint: /applications/start/{id}
     * Dispatches: deployStream- prefixed actions
     *
     * @param {number, required} id - id of app to start
     * @param {string, required} name - app name
     */
    function start(id, name) {
        var url = [configService.api.base, 'applications/start/', id].join('');
        return _stream('POST', name, 'start', url);
    }

    /*
     * stop()
     * Endpoint: /applications/stop/{id}
     * Dispatches: deployStream- prefixed actions
     *
     * @param {number, required} id - id of app to stop
     * @param {string, required} name - app name
     */
    function stop(id, name) {
        var url = [configService.api.base, 'applications/stop/', id].join('');
        return _stream('POST', name, 'stop', url);
    }

    /*
     * update()
     * Endpoint: /applications/update/{id}
     * Dispatches: deployStream- prefixed actions
     *
     * @param {number, required} id - id of app to update
     * @param {string, required} name - app name
     * @param {object, required} body - update info (see API)
     * @param {object, optional} query - query parameters object
     */
    function update(id, name, body, query) {
        var url = [configService.api.base, 'applications/update/', id].join('');
        if (query) {
            url += ('?' + $.param(query));
        }

        return _stream('PUT', name, 'update', url, body);
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
        'create': create,
        'revert': revert,
        'start': start,
        'stop': stop,
        'update': update
    };
}

deployService.$inject = ['$http', '$q', 'actions', 'flux', 'configService'];
module.exports = deployService;