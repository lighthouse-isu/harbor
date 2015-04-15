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
  * deployModel.js
  * Maintains streaming state as applications are deployed
  * and/or updated.
  */
var _ = require('lodash');

function deployModel() {
    'use strict';

    return {
        // Deploy request
        request: {},
        // Stream state
        streamStarted: false,
        streamFinished: false,
        streamGood: false,
        errorMessage: '',
        // Currently running batch steps
        inProgress: [],
        // Completed batch actions
        completed: [],
        // Instances involved in the deploy process
        instances: [],
        // Raw stream log
        streamLog: [],
        // Count of reporting instances in the stream log.
        // Used to cross-reference against 'Complete' status object.
        instanceCount: 0,

        handlers: {
            'deployStreamStart': 'start',
            'deployStreamUpdate': 'update',
            'deployStreamFail': 'fail',
            'deployStreamReset': 'reset'
        },

        start: function (request) {
            this.request = request;
            this.streamStarted = true;
            this.streamGood = true;
            this.instances = request.Instances;
            this.emitChange();
        },

        update: function (progress) {
            if (progress.Status === 'Starting') {
                this.inProgress.push(progress);
            }
            else if (progress.Status === 'Complete') {
                // Error check
                if (progress.Item !== this.instanceCount) {
                    this.streamGood = false;
                    this.errorMessage = 'Missing status objects in stream.';
                    this.streamLog.push(progress);

                    this.emitChange();
                    return;
                }

                // Remove the completed action from those in progress
                this.inProgress = _.without(this.inProgress, _.findWhere(this.inProgress, {
                    'Method': progress.Method,
                    'Endpoint': progress.Endpoint
                }));

                this.completed.push(progress);
                this.instanceCount = 0;
            }
            else if (progress.Status === 'Finalized') {
                this.streamFinished = true;
                this.instanceCount = 0;
                this.emitChange();
            }
            else {
                // Instance log in stream
                this.instanceCount = this.instanceCount + 1;
            }

            // Log raw object
            this.streamLog.push(progress);
            this.emitChange();
        },

        fail: function (error) {
            this.streamGood = false;
            this.errorMessage = 'Streaming has failed.';
            this.emitChange();
        },

        reset: function () {
            this.request = {};
            this.streamStarted = false;
            this.streamFinished = false;
            this.streamGood = false;
            this.errorMessage = '';

            this.inProgress = [];
            this.completed = [];
            this.instances = [];
            this.streamLog = [];
            this.instanceCount = 0;

            this.emitChange();
        },

        exports: {
            state: function () {
                return {
                    'started': this.streamStarted,
                    'finished': this.streamFinished,
                    'good': this.streamGood,
                    'errorMessage': this.errorMessage
                };
            },

            request: function () {
                return this.request;
            },

            inProgress: function () {
                return this.inProgress;
            },

            completed: function () {
                return this.completed;
            },

            instances: function () {
                return this.instances;
            },

            log: function () {
                return this.streamLog;
            }
        }
    };
}

module.exports = deployModel;