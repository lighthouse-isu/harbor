/*
 * beaconModel.js
 * Stores state related to a beacon
 */

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
            this.beacons = r.response;
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
