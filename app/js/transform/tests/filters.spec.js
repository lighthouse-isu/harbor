describe('transform.shorten filter', function () {
    var shortenFilter;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');
        angular.mock.inject(function (_shortenFilter_) {
            shortenFilter = _shortenFilter_;
        });
    });

    it('should handle zero case', function () {
        expect(shortenFilter('test', 0)).toBe('');
    });

    it('should handle negative case', function () {
        expect(shortenFilter('test', -1)).toBe('tes');
    });

    it('should handle overflow case', function () {
        expect(shortenFilter('test', 5)).toBe('test');
    });

    it('should handle underflow case', function () {
        expect(shortenFilter('test', -5)).toBe('');
    });

    it('should handle common case', function () {
        expect(shortenFilter('test', 2)).toBe('te');
    });
});

describe('transform.fromEpoch filter', function () {
    var moment = require('moment'),
        fromEpochFilter;

    beforeEach(function () {
        angular.mock.module('lighthouse.app');
        angular.mock.inject(function (_fromEpochFilter_) {
            fromEpochFilter = _fromEpochFilter_;
        });
    });

    it('should convert from unix epoch', function () {
        expect(fromEpochFilter(moment().unix()).format()).toBe(moment().format());
    });

    it('should convert from unix epoch to relative', function () {
        expect(fromEpochFilter(moment().subtract(1, 'days').unix(), true)).toBe('a day ago');
    });
});