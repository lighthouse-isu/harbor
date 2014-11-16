
describe('containerService', function () {
    var http,
        containerService;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');

        angular.mock.inject(function (_$httpBackend_, _containerService_, Restangular) {
            http = _$httpBackend_;
            containerService = _containerService_;
            // future proof API tests (note: this is RestangularProvider)
            Restangular.setBaseUrl('/api/v0');
        });
    });

    it('should list containers', function () {
        // testing route is created as expected
        http.expect('GET',
            '/api/v0/host/d/containers/json').respond('');

        containerService.list('host');
        http.flush();
    });

    it('should list containers with query parameters', function() {
        http.expect('GET',
            '/api/v0/host/d/containers/json?all=true&size=true').respond('');

        containerService.list('host', {
            all: true,
            size: true
        });
        http.flush();
    });

    it('should create a container', function () {
        http.expect('POST',
            '/api/v0/host/d/containers/create', {some: 'data'}).respond('');

        containerService.create('host', {
            some: 'data'
        });
        http.flush();
    });

    it('should inspect a container', function () {
        http.expect('GET',
            '/api/v0/host/d/containers/id/json').respond('');

        containerService.inspect('host', 'id');
        http.flush();
    });

    it('should list processes running', function () {
        http.expect('GET',
            '/api/v0/host/d/containers/id/top').respond('');

        containerService.top('host', 'id');
        http.flush();
    });

    it('should get container logs', function () {
        http.expect('GET',
            '/api/v0/host/d/containers/id/logs').respond('');

        containerService.logs('host', 'id');
        http.flush();
    });

    it('should get container changes', function () {
        http.expect('GET',
            '/api/v0/host/d/containers/id/changes').respond('');

        containerService.changes('host', 'id');
        http.flush();
    });

    it('should start a container', function () {
        http.expect('POST',
            '/api/v0/host/d/containers/id/start').respond('');

        containerService.start('host', 'id');
        http.flush();
    });

    it('should stop a container', function () {
        http.expect('POST',
            '/api/v0/host/d/containers/id/stop').respond('');

        containerService.stop('host', 'id');
        http.flush();
    });

    it('should restart a container', function () {
        http.expect('POST',
            '/api/v0/host/d/containers/id/restart').respond('');

        containerService.restart('host', 'id');
        http.flush();
    });

    it('should kill a container', function () {
        http.expect('POST',
            '/api/v0/host/d/containers/id/kill').respond('');

        containerService.kill('host', 'id');
        http.flush();
    });

    it('should pause a container', function () {
        http.expect('POST',
            '/api/v0/host/d/containers/id/pause').respond('');

        containerService.pause('host', 'id');
        http.flush();
    });

    it('should unpause a container', function () {
        http.expect('POST',
            '/api/v0/host/d/containers/id/unpause').respond('');

        containerService.unpause('host', 'id');
        http.flush();
    });

    it('should wait on a container', function () {
        http.expect('POST',
            '/api/v0/host/d/containers/id/wait').respond('');

        containerService.wait('host', 'id');
        http.flush();
    });

    it('should remove a container', function () {
        http.expect('DELETE',
            '/api/v0/host/d/containers/id').respond('');

        containerService.remove('host', 'id');
        http.flush();
    });

});

