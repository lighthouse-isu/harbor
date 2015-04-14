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
        // Stream state
        good: true,
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
            'deployStreamDone': 'done',
            'deployStreamFail': 'fail'
        },

        start: function (instances) {
            this.instances = instances;
            this.emitChange();
        },

        update: function (progress) {
            if (progress.Status === 'Starting') {
                this.inProgress.push(progress);
            }
            else if (progress.Status === 'Complete') {
                // Error check
                if (progress.Item !== this.instanceCount) {
                    this.good = false;
                    this.errorMessage = 'Missing status objects in stream.';
                    this.emitChange();
                    return;
                }

                // Remove the completed action from those in progress
                this.inProgress = _.without(this.inProgress, _.findWhere(this.inProgress, {
                    'Method': progress.Method,
                    'Endpoint': progress.Endpoint
                }));

                this.completed.push(progress);
            }
            else {
                // Instance log in stream
                this.instanceCount = this.instanceCount + 1;
            }

            // Log raw object
            this.streamLog.push(progress);
            this.emitChange();
        },

        done: function () {
            this.instanceCount = 0;
            this.emitChange();
        },

        fail: function (error) {
            this.good = false;
            this.errorMessage = 'Streaming has failed.';
            this.emitChange();
        },

        exports: {
            state: function () {
                return {
                    'good': this.good,
                    'errorMessage': this.errorMessage
                };
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