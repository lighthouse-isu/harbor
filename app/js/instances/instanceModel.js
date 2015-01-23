/*
 * instanceModel.js
 * Stores state related to a particular Docker instance.
 */

function instanceModel() {
    return {
        // State
        hostName: '',
        containers: [],

        // Event handlers
        handlers: {
            'listContainers': 'listContainers'
        },

        listContainers: function (containers) {
            this.containers = containers;
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

module.exports = instanceModel;