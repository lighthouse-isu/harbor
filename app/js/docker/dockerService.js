/*
 * docker/dockerService.js
 * Main entrypoint for all controllers requesting Docker instance info.
 */

var _ = require('lodash');

function dockerService($http, actions, flux, configService) {
    /*
     * prepareUrl()
     * @param {string, required} url: docker API call
     * @param {string, required} host: targeted docker instance
     * @param {string} id: container/image id located on host
     */
    function prepareUrl(url, host, id) {
        var request = [configService.api.base, host, '/d'];

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
     * @param {string, required} host: 
     * Note: The exposed interface is shortened to just (host, id, data)
     * via a partial function application.
     */
    function docker(method, url, action, host, id, data) {
        var config = {
            method: method,
            url: prepareUrl(url, host, id),
            responseType: 'json',
            params: method === 'GET' ? data : null,
            data: method === 'POST' ? data : null
        };

        $http(config).then(
            // success
            function (response) {
                flux.dispatch(action, response.data);
            },
            // error
            function (response) {
                // TODO flux.dispatch(actions.error, message)
                console.log('Docker API error: ' + url + ': ' + response);
            }
        );
    }

    /*
     * d()
     * @param *: (see dockerService.docker)
     * Returns the partially applied docker function.
     */
    function d(method, url, action, host, id, data) {
        return _.partial(docker, method, url, action);
    }

    return {
        'containers': {
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

dockerService.$inject = ['$http', 'actions', 'flux', 'configService'];
module.exports = dockerService;
