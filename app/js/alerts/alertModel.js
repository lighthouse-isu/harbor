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