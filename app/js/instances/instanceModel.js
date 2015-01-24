/*
 * instanceModel.js
 * Stores state related to a particular Docker instance.
 */

function instanceModel() {
    return {
        // State
        hostName: '',
        containers: [],
        instances: [],

        // Event handlers
        handlers: {
            'listInstances': 'listInstances',
            'listContainers': 'listContainers'
        },

        listInstances: function (instances) {
            this.instances = instances;
            this.emitChange();
        },

        listContainers: function (containers) {
            this.containers = containers;
            this.emitChange();
        },

        // State access
        exports: {
            getContainers: function () {
                return this.containers;
            },

            getInstances: function () {
                return this.instances;
            }
        }
    };
}

module.exports = instanceModel;