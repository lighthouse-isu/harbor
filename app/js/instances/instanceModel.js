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
        containers: {
            // responses from /containers/json
            summaries: [],
            // responses from /containers/{id}/json
            details: {}
        },
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
            this.containers.details[id(r.response)] = r.response;
            this.emitChange();
        },

        listInstances: function (r) {
            this.instances = r.response;
            this.emitChange();
        },

        listContainers: function (r) {
            this.containers.summaries = r.response;
            this.emitChange();
        },

        listImages: function (r) {
            this.images = r.response;
            this.emitChange();
        },

        // State access
        exports: {
            getContainers: function () {
                return this.containers.summaries;
            },

            getContainer: function (id) {
                return this.containers.details[id];
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
