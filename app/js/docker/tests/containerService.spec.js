
describe('containerService', function () {
    var http,
        configService,
        containerService;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');

        angular.mock.inject(function (_$httpBackend_, _configService_, _containerService_) {
            http = _$httpBackend_;
            configService = _configService_;
            containerService = _containerService_;
        });
    });

    it('should list containers', function () {
        // testing route is created as expected
        http.expect('GET',
            configService.api.base + 'host/d/containers/json').respond('');

        containerService.list('host');
        http.flush();
    });

    it('should list containers with query parameters', function() {
        http.expect('GET',
            configService.api.base + 'host/d/containers/json?all=true&size=true').respond('');

        containerService.list('host', {
            all: true,
            size: true
        });
        http.flush();
    });

    it('should start a container', function () {
        http.expect('POST',
            configService.api.base + 'host/d/containers/id/start').respond('');

        containerService.start('host', 'id');
        http.flush();
    });

    it('should stop a container', function () {
        http.expect('POST',
            configService.api.base + 'host/d/containers/id/stop').respond('');

        containerService.stop('host', 'id');
        http.flush();
    });

    it('should restart a container', function () {
        http.expect('POST',
            configService.api.base + 'host/d/containers/id/restart').respond('');

        containerService.restart('host', 'id');
        http.flush();
    });

    it('should pause a container', function () {
        http.expect('POST',
            configService.api.base + 'host/d/containers/id/pause').respond('');

        containerService.pause('host', 'id');
        http.flush();
    });

    it('should unpause a container', function () {
        http.expect('POST',
            configService.api.base + 'host/d/containers/id/unpause').respond('');

        containerService.unpause('host', 'id');
        http.flush();
    });

});

