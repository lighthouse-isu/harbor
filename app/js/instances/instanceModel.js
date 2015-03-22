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
        showAllImages: false,
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
            'imageShowAll': 'imageShowAll',
            'searchImages': 'searchImages',
            'pullImage': 'pullImage'
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

        imageShowAll: function (r) {
            this.showAllImages = r;
        },

        searchImages: function(r) {
            this.foundImages = r.response;
            this.emitChange();
        },

        pullImage: function(r) {
            var imageTag = r.meta.query.fromImage;

            if (r.pattern === '{error}') {
                alertService.create({
                    message: statusUpdate.error,
                    type: 'danger'
                });
                this.loadingImages = _.omit(this.loadingImages, imageTag);
                this.emitChange();
                return;
            }

            // right now we have to guess when the image pull has finished
            // https://github.com/jimhigson/oboe.js/issues/44
            if (_.startsWith(r.response.status, 'Status: Downloaded newer image') ||
                _.startsWith(r.response.status, 'Status: Image is up to date')) {

                this.loadingImages = _.omit(this.loadingImages, imageTag);
                dockerService.d('images.list', {
                    host: r.host,
                    query: {all: this.showAllImages}
                });

                this.emitChange();
                return;
            }

            if (!_.has(this.loadingImages, imageTag)) {
                this.loadingImages[imageTag] = '0%';
                this.emitChange();
            }

            if (_.has(r.response, 'progressDetail') && _.has(r.response.progressDetail, 'current')) {
                var progress = r.response.progressDetail;
                this.loadingImages[imageTag] = 100 * progress.current / progress.total + '%';
                this.emitChange();
            }
        },

        // State access
        exports: {
            getContainers: function () {
                return this.containers.summaries;
            },

            getShowAllImages: function() {
                return this.showAllImages;
            },

            getContainer: function (id) {
                return this.containers.details[id];
            },

            getLoadingImages: function() {
                return this.loadingImages;
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
