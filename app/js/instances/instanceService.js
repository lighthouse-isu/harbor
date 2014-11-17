/*
 * instanceService
 * Requests and manages information related to instance discovery.
 */
function instanceService(Restangular) {

    var baseInstances = Restangular.all('instances');

    function getInstances() {
        return 'hello from instanceService';
    }

    return {
        'getInstances': getInstances
    };
}

instanceService.$inject = ['Restangular'];
module.exports = instanceService;
