/*
 * alerts/alertService.js
 * Wraps flux dispatch methods for alert creation and dismissal.
 */

function alertService(actions, flux) {
    'use strict';

    /*
     * create()
     * @param {object} alert: describes the alert
     *      keys: {string} message: user facing text
     *            {string} type: 'success', 'info', 'warning', or 'danger'
     *            {int} timeout: in seconds - if null, alert must be manually dismissed
     */
    function create(alert) {
        flux.dispatch(actions.alertCreate, alert);
    }

    /*
     * clear()
     * Dispatches a global alert clear.
     */
    function clear() {
        flux.dispatch(actions.alertClear);
    }

    return {
        'clear': clear,
        'create': create
    };

}

alertService.$inject = ['actions', 'flux'];
module.exports = alertService;