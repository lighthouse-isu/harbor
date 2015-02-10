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

        // Event handlers
        handlers: {
            'alertClear': 'alertClear',
            'alertCreate': 'alertCreate'
        },

        alertClear: function () {
            // cancel registered timeouts
            _(this.alerts).forEach(function (alert) {
                if (alert.promise) {
                    $timeout.cancel(alert.promise);
                }
            });

            this.alerts = [];
            this.emitChange();
        },

        alertCreate: function (alert) {
            this.alerts.push(alert);
            this.emitChange();

            if (alert.timeout) {
                alert.promise = $timeout(function () {
                    this.alerts = _.without(this.alerts, alert);
                    this.emitChange();
                }.bind(this), alert.timeout * 1000);
            }
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