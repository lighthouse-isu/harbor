/*
 * beaconModel.js
 * Stores state related to a beacon
 */

var _ = require('lodash');

function beaconModel() {
    return {
        // State
        address: '',
        token: '',
        beacons: [],

        // Event handlers
        handlers: {
            'addBeacon': 'addBeacon',
            'listBeacons': 'listBeacons'
        },

        listBeacons: function (r) {
            this.beacons = _.map(r.response, function (addr) { return {address: addr}; });
            this.emitChange();
        },

        addBeacon: function (beacon) {
            this.beacons.push(beacon);
            this.emitChange();
        },

        // State access
        exports: {
            getBeacons: function () {
                return this.beacons;
            }
        }
    };
}

module.exports = beaconModel;
