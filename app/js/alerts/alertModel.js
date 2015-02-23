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
 * alerts/alertModel.js
 * Stores list of active alerts.
 */

var _ = require('lodash');

function alertModel($timeout) {
    'use strict';

    return {
        // State
        alerts: [],
        nextId: 0,

        // Event handlers
        handlers: {
            'alertClear': 'alertClear',
            'alertCreate': 'alertCreate',
            'alertDismiss': 'alertDismiss'
        },

        alertClear: function () {
            // cancel registered timeouts
            _(this.alerts).forEach(function (alert) {
                if (alert.promise) {
                    $timeout.cancel(alert.promise);
                }
            });

            this.nextId = 0;
            this.alerts = [];
            this.emitChange();
        },

        alertCreate: function (alert) {
            if (alert.timeout) {
                alert.promise = $timeout(function () {
                    this.alerts = _.without(this.alerts, alert);
                    this.emitChange();
                }.bind(this), alert.timeout * 1000);
            }

            alert.id = this.nextId++;
            this.alerts.push(alert);
            this.emitChange();
        },

        alertDismiss: function (id) {
            var remove = _.find(this.alerts, {'id': id});
            if (remove.promise) {
                $timeout.cancel(remove.promise);
            }

            this.alerts = _.without(this.alerts, remove);
            this.emitChange();
        },

        // State access
        exports: {
            getAll: function () {
                return this.alerts;
            }
        }
    };
}

alertModel.$inject = ['$timeout'];
module.exports = alertModel;
