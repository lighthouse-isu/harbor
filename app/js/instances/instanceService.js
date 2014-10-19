/*
 * instanceService
 * Requests and manages information related to instance discovery.
 */
function instanceService(Restangular) {

    function getInstances() {

    }

    return {
        'getInstances': getInstances
    };
}

instanceService.$inject = ['Restangular'];
module.exports = instanceService;
