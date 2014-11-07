/*
 * containerService
 * Builds and requests Docker container endpoints for a target host.
 */
function containerService(Restangular) {
    'use strict';

    /*
     * dockerBase - private
     * /{host}/d
     *
     * @param host - string identifying target host
     */
    function dockerBase(host) {
        return Restangular.all(host).all('d');
    }

    /*
     * list()
     * /{host}/d/containers/json
     *
     * @param host - string identifying target host
     */
     function list(host, query, headers) {
        return dockerBase(host)
            .one('containers').one('json').get(query, headers);
    }

    return {
        'list': list
    };
}

containerService.$inject = ['Restangular'];
module.exports = containerService;
