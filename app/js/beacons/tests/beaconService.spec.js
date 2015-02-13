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
            configService.api.base + 'beacons/create').respond('');

        var beacon = {
          Address: '127.0.0.1:5000',
          Token: 'token',
          Users: ['user@example.com', 'user2@example.com']
        }

        beaconService.createBeacon(beacon);
        http.flush();
    });
});
