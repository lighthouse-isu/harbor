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
 * docker/dockerService.js
 * Main entrypoint for all controllers requesting Docker instance info.
 */

var _ = require('lodash');

function dockerService($http, actions, flux, alertService, configService) {
    /*
     * prepareUrl()
     * @param {string, required} url: docker API call
     * @param {string, required} host: targeted docker instance
     * @param {string} id: container/image id located on host
     */
    function prepareUrl(url, host, id) {
        var request = [configService.api.base, 'd/', encodeURIComponent(host)];

        if (id && (url.indexOf('{id}') > 0)) {
            request.push(url.replace('{id}', id));
        }
        else {
            request.push(url);
        }

        return request.join('');
    }

    /*
     * docker()
     * @param {string, required} method: HTTP verb
     * @param {string, required} url: Docker API URL
     * @param {string, required} action: application action to dispatch with response data
     * @param {string, required} host: lighthouse alias for targeted Docker instance
     * @param {string} cid: Docker generated id for image or container
     * @param {object} data: if method is GET, set data as query parameters,
     *                       if POST, set in request body under 'Payload' key
     *
     * Note: The exposed interface is shortened to just (host, id, data)
     * via a partial function application.
     */
    function docker(method, url, action, host, cid, data) {
        var config = {
            method: method,
            url: prepareUrl(url, host, cid),
            responseType: 'json',
            params: method === 'GET' ? data : null,
            data: method === 'POST' ? {'Payload': data} : null,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(config).then(
            // success
            function (response) {
                flux.dispatch(action,
                    {'id': cid, 'host': host, 'response': response.data});
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

    /*
     * d()
     * @param *: (see dockerService.docker)
     * Returns the partially applied docker function.
     */
    function d(method, url, action, host, cid, data) {
        return _.partial(docker, method, url, action);
    }

    return {
        'containers': {
            'inspect': d('GET', '/containers/{id}/json', actions.inspectContainer),
            'create':  d('POST', '/containers/create', actions.createContainer),
            'list':    d('GET', '/containers/json', actions.listContainers),
            'start':   d('POST', '/containers/{id}/start', actions.startContainer),
            'stop':    d('POST', '/containers/{id}/stop', actions.stopContainer),
            'restart': d('POST', '/containers/{id}/restart', actions.restartContainer),
            'pause':   d('POST', '/containers/{id}/pause', actions.pauseContainer),
            'unpause': d('POST', '/containers/{id}/unpause', actions.unpauseContainer)
        },
        'images': {
            'list': d('GET', '/images/json', actions.listImages)
        }
    };
}

dockerService.$inject = ['$http', 'actions', 'flux', 'alertService', 'configService'];
module.exports = dockerService;
