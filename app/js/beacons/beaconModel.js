/*
 * beaconModel.js
 * Stores state related to a particular Docker instance.
 */

function instanceModel() {
    return {
        // State
        address: '',
        token: '',
        users: [],

        // Event handlers
        handlers: {
        },

        listUsers: function (instances) {
            this.instances = instances;
            this.emitChange();
        },

        // State access
        exports: {
            getContainers: function () {
                return this.containers;
            }
        }
    };
}

module.exports = beaconModel;
