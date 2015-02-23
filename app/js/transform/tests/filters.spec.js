/*
 *  Copyright 2015 Caleb Brose, Chris Fogerty, Rob Sheehy, Zach Taylor, Nick Miller
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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
