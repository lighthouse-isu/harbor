/*
 * alerts/alertDirective.js
 * Provides an angular directive to host alert popups.
 */

function alertDirective() {
    'use strict';

    return {
        'restrict': 'A',
        'controller': 'alertController',
        'template': require('./templates/alerts.html')
    };
}

module.exports = alertDirective;
