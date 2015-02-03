/*
 * instanceModel.js
 * Stores state related to a particular Docker instance.
 */

var _ = require('lodash');

/*
 * @return shortened container Id hash
 */
function id(c) {
    return c.Id.slice(0, 10);
}

function instanceModel() {
    'use strict';

    return {
        // State
        hostName: '',
        containers: {},
        images: [],
        instances: [],

        // Event handlers
        handlers: {
            'inspectContainer': 'inspectContainer',
            'listInstances': 'listInstances',
            'listContainers': 'listContainers',
            'listImages': 'listImages'
        },

        inspectContainer: function (c) {
            var update = this.containers[id(c)];
            if (update) {
                update.detail = c;
                this.emitChange();
            }
        },

        listInstances: function (instances) {
            this.instances = instances;
            this.emitChange();
        },

        listContainers: function (containers) {
            // Store containers, indexed by their shortened Docker id
            this.containers = _.indexBy(_.map(containers, function (c) {
                // Build model
                return { summary: c, detail: null };
            }), function (c) {
                // Generate key
                return id(c.summary);
            });

            this.emitChange();
        },

        listImages: function (images) {
            this.images = images;
            this.emitChange();
        },

        // State access
        exports: {
            getContainers: function () {
                return _.map(this.containers, function (c) {
                    return c.summary;
                });
            },

            getContainer: function (id) {
                var c = this.containers[id.slice(0, 10)];
                return c ? c.detail : undefined;
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