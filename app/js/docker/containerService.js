/*
 * containerService
 * Builds and requests Docker container endpoints for a target host.
 *
 * Exposed API methods have the following parameters:
 *  @param host - string identifying target host
 *  @param query/data - query parameters or associated body data
 *  @param headers - request headers
 *  (optionally) @param id - string, container id
 *
 * Additional parameters are specified on the docstring.
 * The method definition order follows the order of Docker's API docs as of v1.15
 *
 */
function containerService($http, actions, flux, configService) {
    'use strict';

    // Build a Docker request URL for host
    function request(host, call) {
        return [configService.api.base, host, '/d', call].join('');
    }

    // General request wrappers
    // @param {string} action - app action to fire upon success
    // @param {object} query - object whose key, value pairs map to key, value query params
    function get(request, action, query) {
        $http.get(request, {params: query}).then(
            // success
            function (response) {
                flux.dispatch(action, response.data);
            },
            // error
            function (response) {
                // TODO flux.dispatch(actions.error, message)
                console.log('Docker API error: ' + request + ': ' + response);
            }
        );
    }

    // @param {*} data - data to serialize into POST body
    function post(request, action, data) {
        $http.post(request, data).then(
            // success
            function (response) {
                flux.dispatch(action, response.data);
            },
            // error
            function (response) {
                // TODO flux.dispatch(actions.error, message)
                console.log('Docker API error: ' + request + ': ' + response);
            }
        );
    }

    // GET /{host}/d/containers/json
    function list(host, query) {
        get(request(host, '/containers/json'), actions.listContainers, query);
    }

    // POST /{host}/d/containers/{id}/start
    function start(host, id) {
        post(request(host, '/containers/' + id + '/start'), actions.startContainer);
    }

    // POST /{host}/d/containers/{id}/stop
    function stop(host, id) {
        post(request(host, '/containers/' + id + '/stop'), actions.stopContainer);
    }

    // POST /{host}/d/containers/{id}/restart
    function restart(host, id) {
        post(request(host, '/containers/' + id + '/restart'), actions.restartContainer);
    }

    // POST /{host}/d/containers/{id}/pause
    function pause(host, id) {
        post(request(host, '/containers/' + id + '/pause'), actions.pauseContainer);
    }

    // POST /{host}/d/containers/{id}/unpause
    function unpause(host, id) {
        post(request(host, '/containers/' + id + '/unpause'), actions.unpauseContainer);
    }

    return {
        'list': list,
        'start': start,
        'stop': stop,
        'restart': restart,
        'pause': pause,
        'unpause': unpause
    };
}

containerService.$inject = ['$http', 'actions', 'flux', 'configService'];
module.exports = containerService;
