/*
 * instanceModel.js
 * Stores state related to a particular Docker instance.
 */

function instanceModel() {
    return {
        // State
        hostName: '',
        containers: [],
        images: [],
        instances: [],

        // Event handlers
        handlers: {
            'listInstances': 'listInstances',
            'listContainers': 'listContainers',
            'listImages': 'listImages'
        },

        listInstances: function (instances) {
            this.instances = instances;
            this.emitChange();
        },

        listContainers: function (containers) {
            this.containers = containers;
            this.emitChange();
        },

        listImages: function (images) {
            this.images = images;
            this.emitChange();
        },

        // State access
        exports: {
            getContainers: function () {
                return this.containers;
            },

            getInstances: function () {
                return this.instances;
            },

            getImages: function () {
                return this.images;
            }
        }
    };
}

module.exports = instanceModel;