describe('instanceService', function () {
    var http,
        instanceService;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');

        angular.mock.inject(function (_$httpBackend_, _instanceService_, Restangular) {
            http = _$httpBackend_;
            instanceService = _instanceService_;
            Restangular.setBaseUrl('/api/v0');
        });
    });

    it('should list instances', function () {
        http.expect('GET',
            '/api/v0/provider/vms').respond('');

        instanceService.getInstances();
        http.flush();
    });

    it('should get which', function () {
        http.expect('GET',
            '/api/v0/provider/which').respond('');

        instanceService.whichProvider();
        http.flush();
    });
});
