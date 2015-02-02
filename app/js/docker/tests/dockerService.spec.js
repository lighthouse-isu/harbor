
describe('dockerService.containers', function () {
    var http,
        configService,
        dockerService;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');

        angular.mock.inject(function (_$httpBackend_, _configService_, _dockerService_) {
            http = _$httpBackend_;
            configService = _configService_;
            dockerService = _dockerService_;
        });
    });

    it('should uri encode host', function () {
        http.expect('GET',
            configService.api.base + 'host%40com/d/containers/json').respond('');

        dockerService.containers.list('host@com');
        http.flush();
    });

    it('should list containers', function () {
        // testing route is created as expected
        http.expect('GET',
            configService.api.base + 'host/d/containers/json').respond('');

        dockerService.containers.list('host');
        http.flush();
    });

    it('should list containers with query parameters', function() {
        http.expect('GET',
            configService.api.base + 'host/d/containers/json?all=true&size=true').respond('');

        dockerService.containers.list('host', null, {
            all: true,
            size: true
        });
        http.flush();
    });

    it('should start a container', function () {
        http.expect('POST',
            configService.api.base + 'host/d/containers/id/start').respond('');

        dockerService.containers.start('host', 'id');
        http.flush();
    });

    it('should stop a container', function () {
        http.expect('POST',
            configService.api.base + 'host/d/containers/id/stop').respond('');

        dockerService.containers.stop('host', 'id');
        http.flush();
    });

    it('should restart a container', function () {
        http.expect('POST',
            configService.api.base + 'host/d/containers/id/restart').respond('');

        dockerService.containers.restart('host', 'id');
        http.flush();
    });

    it('should pause a container', function () {
        http.expect('POST',
            configService.api.base + 'host/d/containers/id/pause').respond('');

        dockerService.containers.pause('host', 'id');
        http.flush();
    });

    it('should unpause a container', function () {
        http.expect('POST',
            configService.api.base + 'host/d/containers/id/unpause').respond('');

        dockerService.containers.unpause('host', 'id');
        http.flush();
    });

});

