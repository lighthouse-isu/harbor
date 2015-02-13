describe('userService', function () {
    var http,
        configService,
        userService;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');

        angular.mock.inject(function (_$httpBackend_, _configService_, _userService_) {
            http = _$httpBackend_;
            configService = _configService_;
            userService = _userService_;
        });
    });

    it('should list users', function () {
        http.expect('GET',
            configService.api.base + 'users').respond('');

        userService.getUsers();
        http.flush();
    });
});
