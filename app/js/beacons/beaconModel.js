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
 * beaconModel.js
 * Stores state related to a beacon
 */

var _ = require('lodash');

function beaconModel() {
    return {
        // State
        token: '',
        beacons: [],

        // Event handlers
        handlers: {
            'addBeacon': 'addBeacon',
            'listBeacons': 'listBeacons'
        },

        listBeacons: function (r) {
            this.beacons = r.response;
            this.emitChange();
        },

        addBeacon: function (beacon) {
            this.beacons.push(beacon);
            this.emitChange();
        },

        // State access
        exports: {
            getBeacons: function () {
                return this.beacons;
            }
        }
    };
}

module.exports = beaconModel;
