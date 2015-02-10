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
            'alertCreate': 'alertCreate',
        },

        alertCreate: function (alert) {
            this.alerts.push(alert);
            this.emitChange();

            if (alert.timeout) {
                $timeout(function () {
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