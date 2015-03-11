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
        loadingImages: {},
        foundImages: [],

        // Event handlers
        handlers: {
            'inspectContainer': 'inspectContainer',
            'startContainer': 'containerUpdate',
            'stopContainer': 'containerUpdate',
            'pauseContainer': 'containerUpdate',
            'unpauseContainer': 'containerUpdate',
            'listContainers': 'listContainers',
            'listImages': 'listImages',
            'searchImages': 'searchImages',
            'pullImage': 'pullImage'
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

        listContainers: function (r) {
            this.containers.summaries = r.response;
            this.emitChange();
        },

        listImages: function (r) {
            this.images = r.response;
            this.emitChange();
        },

        searchImages: function(r) {
            this.foundImages = r.response;
            this.emitChange();
        },

        pullImage: function(r) {
            var statusUpdate = r.response;
            if (r.pattern === '{error}') {
                alertService.create({
                    message: statusUpdate.error,
                    type: 'danger'
                });
                return;
            }

            var imageIsPulling = _.startsWith(statusUpdate.status, 'Pulling image ');
            var imageIdUnique = !_.has(this.loadingImages, statusUpdate.id);

            if (imageIsPulling && imageIdUnique) {
                var imageName = statusUpdate.status.split('from ')[1];
                var imageTag = statusUpdate.status.split('(')[1].split(')')[0];

                this.loadingImages[statusUpdate.id] = {
                    'Id': statusUpdate.id,
                    'RepoTags': [imageName + ':' + imageTag]
                };
            }
        },

        // State access
        exports: {
            getContainers: function () {
                return this.containers.summaries;
            },

            getContainer: function (id) {
                return this.containers.details[id];
            },

            getLoadingImages: function() {
                // filter out loading images if they've been loaded
                var imageIds = _.map(this.images, function(image) {
                    return image.Id.slice(0, 12);
                });
                this.loadingImages = _.omit(this.loadingImages, imageIds);

                return _.values(this.loadingImages);
            },

            getImages: function () {
                return this.images;
            },

            getSearchedImages: function() {
                return this.foundImages;
            }
        }
    };
}

instanceModel.$inject = ['dockerService'];
module.exports = instanceModel;
