describe('instanceService', function () {
    var http,
        configService,
        instanceService;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');

        angular.mock.inject(function (_$httpBackend_, _configService_, _instanceService_) {
            http = _$httpBackend_;
            configService = _configService_;
            instanceService = _instanceService_;
        });
    });

    it('should list instances', function () {
        http.expect('GET',
            configService.api.base + 'provider/vms').respond('');

        instanceService.getInstances();
        http.flush();
    });
});
