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

    /* 
     * dismiss()
     * Dispatches a global alert dismiss for the given id.
     */
    function dismiss(id) {
        flux.dispatch(actions.alertDismiss, id);
    }

    return {
        'clear': clear,
        'create': create,
        'dismiss': dismiss
    };

}

alertService.$inject = ['actions', 'flux'];
module.exports = alertService;
