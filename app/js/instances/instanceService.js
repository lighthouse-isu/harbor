/*
 * instanceService
 * Requests and manages information related to instance discovery.
 */
function instanceService(Restangular) {
  'use strict';

    var baseInstances = Restangular.all('instances');

    function instanceBase(provider) {
      return Restangular
        .one('plugins').one(provider);
    }

    function getInstances(provider, query, headers) {
        return instanceBase
            .one('vms').get(query, headers);
    }

    function findInstances(provider, query, headers) {
        return instanceBase
            .one('vms').one('find').get(query, headers);
    }

    function authorizeInstance(provider, query, headers) {
        return instanceBase
            .one('authorize').get(query, headers);
    }

    return {
        'getInstances': getInstances,
        'findInstances': findInstances,
        'authorizeInstance': authorizeInstance
    };
}

instanceService.$inject = ['Restangular'];
module.exports = instanceService;
