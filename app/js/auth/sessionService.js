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
 * auth/sessionService.js
 * Wraps $window.sessionStorage to protect read/write operations.
 */
function sessionService($window) {

    var storage = $window.sessionStorage;

    /*
     * get()
     * Read key's value passed through JSON.parse()
     * @param {string} key - key to fetch
     */
    function get(key) {
        if (storage[key] === undefined) {
            return undefined;
        }
        else {
            return JSON.parse(storage[key]);
        }
    }

    /*
     * set()
     * Set key to value, passed through JSON.stringify()
     * @param {string} key - key to set
     * @param {*} value - value to associate
     */
    function set(key, value) {
        storage[key] = JSON.stringify(value);
    }

    /*
     * remove()
     * Delete key from session object.
     * @param {string} key - key to delete
     */
    function remove(key) {
        delete storage[key];
    }

    return {
        'get': get,
        'set': set,
        'remove': remove
    };
}

sessionService.$inject = ['$window'];
module.exports = sessionService;