/*
 * beaconModel.js
 * Stores state related to a beacon
 */

function beaconModel() {
    return {
        // State
        address: '',
        token: '',
        users: [],

        // Event handlers
        handlers: {
          'createBeacon': 'createBeacon'
        },

        createBeacon: function (r) {
            this.beacon = r.response;
            this.emitChange();
        },

        // State access
        exports: {
            createBeacon: function () {
                return this.beacon;
            }
        }
    };
}

module.exports = beaconModel;
