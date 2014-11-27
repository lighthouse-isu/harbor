// authService.spec.js

describe('authService', function () {
    var http,
        authService,
        configService,
        rootScope;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');
        angular.mock.inject(function (_$httpBackend_, _$rootScope_, _authService_, _configService_) {
            http = _$httpBackend_;
            authService = _authService_;
            configService = _configService_;
            rootScope = _$rootScope_;
        });
    });

    it('should use the right login URL', function () {
        http.expect('POST',
            configService.api.base + '/login').respond('');

        authService.login({});
        http.flush();
    });

    it('should use the right logout URL', function () {
        http.expect('GET',
            configService.api.base + '/logout').respond('');

        authService.logout();
        http.flush();
    });

    it('should determine status', function () {
        expect(authService.isLoggedIn()).toBe(false);

        rootScope.user = {'email': 'test@test.com'};
        expect(authService.isLoggedIn()).toBe(true);
    });
});