/*
 *  Copyright 2015 Caleb Brose, Chris Fogerty, Rob Sheehy, Zach Taylor, Nick Miller
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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

        // Event handlers
        handlers: {
            'inspectContainer': 'inspectContainer',
            'startContainer': 'containerUpdate',
            'stopContainer': 'containerUpdate',
            'pauseContainer': 'containerUpdate',
            'unpauseContainer': 'containerUpdate',
            'listContainers': 'listContainers',
            'listImages': 'listImages'
        },

        // containerUpdate() - multi-action handler
        // forces container inspection
        containerUpdate: function (r) {
            dockerService.d('containers.inspect', {
                host: r.host,
                id: r.id
            });
        },

        inspectContainer: function (r) {
            this.containers.details[id(r.response)] = r.response;
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

            getImages: function () {
                return this.images;
            }
        }
    };
}

instanceModel.$inject = ['dockerService'];
module.exports = instanceModel;
