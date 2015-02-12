describe('beaconService', function () {
    var http,
        configService,
        beaconService;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');

        angular.mock.inject(function (_$httpBackend_, _configService_, _beaconService_) {
            http = _$httpBackend_;
            configService = _configService_;
            beaconService = _beaconService_;
        });
    });

    it('should create beacon', function () {
        http.expect('POST',
            configService.api.base + 'beacon/create').respond('');

        beaconService.createBeacon();
        http.flush();
    });
});
