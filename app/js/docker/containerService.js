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
function containerService(Restangular, actions, flux) {
    'use strict';

    /*
     * dockerBase - private
     * /{host}/d/containers
     */
    function dockerBase(host) {
        return Restangular
            .one(host).one('d').one('containers');
    }

    /*
     * list()
     * GET /{host}/d/containers/json
     */
     function list(host, query, headers) {
        dockerBase(host).one('json').get(query, headers).then(
            // success
            function (containers) {
                flux.dispatch(actions.listContainers, containers);
            },
            // error
            function (response) {
                // TODO flux.dispatch(action.error, message)
                console.log('Docker API error: /containers/json: ' + response);
            }
        );
    }

    /*
     * create()
     * POST /{host}/d/containers/create
     */
    function create(host, data, headers) {
        return dockerBase(host)
            .all('create').post(data, headers);
    }

    /*
     * inspect()
     * GET /{host}/d/containers/{id}/json
     */
    function inspect(host, id, query, headers) {
        return dockerBase(host)
            .one(id).one('json').get(query, headers);
    }

    /*
     * top()
     * GET /{host}/d/containers/{id}/top
     */
    function top(host, id, query, headers) {
        return dockerBase(host)
            .one(id).one('top').get(query, headers);
    }

    /*
     * logs()
     * GET /{host}/d/containers/{id}/logs
     */
    function logs(host, id, query, headers) {
        return dockerBase(host)
            .one(id).one('logs').get(query, headers);
    }

    /*
     * changes()
     * GET /{host}/d/containers/{id}/changes
     */
    function changes(host, id, query, headers) {
        return dockerBase(host)
            .one(id).one('changes').get(query, headers);
    }

    /*
     * start()
     * POST /{host}/d/containers/{id}/start
     */
    function start(host, id, query, headers) {
        return dockerBase(host)
            .one(id).one('start').post(query, headers);
    }

    /*
     * stop()
     * POST /{host}/d/containers/{id}/stop
     */
    function stop(host, id, query, headers) {
        return dockerBase(host)
            .one(id).one('stop').post(query, headers);
    }

    /*
     * restart()
     * POST /{host}/d/containers/{id}/restart
     */
    function restart(host, id, query, headers) {
        return dockerBase(host)
            .one(id).one('restart').post(query, headers);
    }

    /*
     * kill()
     * POST /{host}/d/containers/{id}/kill
     */
    function kill(host, id, query, headers) {
        return dockerBase(host)
            .one(id).one('kill').post(query, headers);
    }

    /*
     * pause()
     * POST /{host}/d/containers/{id}/pause
     */
    function pause(host, id, query, headers) {
        return dockerBase(host)
            .one(id).one('pause').post(query, headers);
    }

    /*
     * unpause()
     * POST /{host}/d/containers/{id}/unpause
     */
    function unpause(host, id, query, headers) {
        return dockerBase(host)
            .one(id).one('unpause').post(query, headers);
    }

    /*
     * wait()
     * POST /{host}/d/containers/{id}/wait
     */
    function wait(host, id, query, headers) {
        return dockerBase(host)
            .one(id).one('wait').post(query, headers);
    }

    /*
     * remove()
     * DELETE /{host}/d/containers/{id}
     */
    function remove(host, id, query, headers) {
        return dockerBase(host)
            .one(id).remove(query, headers);
    }

    return {
        // Currently a subset of all Docker container calls
        'changes': changes,
        'create': create,
        'inspect': inspect,
        'kill': kill,
        'list': list,
        'logs': logs,
        'pause': pause,
        'remove': remove,
        'restart': restart,
        'start': start,
        'stop': stop,
        'top': top,
        'unpause': unpause,
        'wait': wait
    };
}

containerService.$inject = ['Restangular', 'actions', 'flux'];
module.exports = containerService;
