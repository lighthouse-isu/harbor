/*
 * transform/init.js
 * Application wide view transformations. Processes specified expressions in templates
 * into specified formats.
 */

var moment = require('moment'),
    transform = angular.module('lighthouse.transform', []);

/*
 * shorten (filter)
 * @param {string} element - string to shorten
 * @param {number} to - passed as upper bound on .slice()
 */
transform.filter('shorten', function() {
    return function(element, to) {
        return element.slice(0, to);
    };
});

/*
 * fromEpoch (filter)
 * @param {number} epoch - integer epoch value to convert
 * @param {boolean} toRelative - if true, uses moment's .fromNow() to obtain a relative date
 */
transform.filter('fromEpoch', function() {
    return function(epoch, toRelative) {
        if (toRelative) {
            return moment.unix(epoch).fromNow();
        }
        return moment.unix(epoch);
    };

});

/*
 * stringify (filter)
 * @param {object} obj - to stringify
 */
transform.filter('stringify', function() {
    return function(obj) {
        // four spaces
        return JSON.stringify(obj, null, '    ');
    };
});

module.exports = transform;