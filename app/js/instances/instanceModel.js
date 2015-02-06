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

function instanceModel(dockerService) {
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
            'startContainer': 'containerUpdate',
            'stopContainer': 'containerUpdate',
            'pauseContainer': 'containerUpdate',
            'unpauseContainer': 'containerUpdate',
            'listInstances': 'listInstances',
            'listContainers': 'listContainers',
            'listImages': 'listImages'
        },

        // containerUpdate() - multi-action handler
        // forces container inspection
        containerUpdate: function (r) {
            dockerService.containers.inspect(r.host, r.id);
        },

        inspectContainer: function (r) {
            var update = this.containers[id(r.response)];
            if (update) {
                update.detail = r.response;
                this.emitChange();
            }
        },

        listInstances: function (r) {
            this.instances = r.response;
            this.emitChange();
        },

        listContainers: function (r) {
            // Store containers, indexed by their shortened Docker id
            this.containers = _.indexBy(_.map(r.response, function (c) {
                // Build model
                return { summary: c, detail: null };
            }), function (c) {
                // Generate key
                return id(c.summary);
            });

            this.emitChange();
        },

        listImages: function (r) {
            this.images = r.response;
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

instanceModel.$inject = ['dockerService'];
module.exports = instanceModel;
