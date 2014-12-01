/*
 * instanceService
 * Requests and manages information related to instance discovery.
 */
function instanceService(Restangular) {
    'use strict';

    function instanceBase() {
      return Restangular
        .one('provider');
    }

    function getInstances(query, headers) {
        return instanceBase()
            .one('vms').get(query, headers);
    }

    function whichProvider(query, headers) {
        return instanceBase()
            .one('which').get(query, headers);
    }

    return {
        'getInstances': getInstances,
        'whichProvider': whichProvider
    };
}

instanceService.$inject = ['Restangular'];
module.exports = instanceService;
