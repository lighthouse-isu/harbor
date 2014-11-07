
var angular = require('angular');


describe('containerService', function () {
    var $httpBackend,
        containerService;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');

        angular.mock.inject(function (_$httpBackend_, _containerService_) {
            $httpBackend = _$httpBackend_;
            containerService = _containerService_;
        });
    });

    it('should list containers', function () {
        // testing route is created as expected
        $httpBackend.expect('GET',
            '/api/v0/host/d/containers/json').respond('');

        containerService.list('host');
        $httpBackend.flush();
    });

    it('should list containers with query parameters', function() {
        $httpBackend.expect('GET',
            '/api/v0/host/d/containers/json?all=true&size=true').respond('');

        containerService.list('host', {
            all: true,
            size: true
        });

        $httpBackend.flush();
    });
});

