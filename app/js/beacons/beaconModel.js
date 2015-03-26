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
        nextId: 0,
        // generated ID -> beacon top-level info
        beacons: {},
        // generated ID -> beacon instance list
        instances: {},

        // Event handlers
        handlers: {
            'addBeacon': 'addBeacon',
            'listBeacons': 'listBeacons',
            'listInstances': 'listInstances'
        },

        addBeacon: function (beacon) {
            var id = this.nextId,
                newBeacon = _.assign(beacon, {'id': id});

            this.beacons[id.toString()] = newBeacon;
            this.nextId = this.nextId + 1;
            this.emitChange();
        },

        listBeacons: function (r) {
            // attach id
            this.beacons = {};
            this.instances = {};
            var id = 0;

            var _beacons = _.map(r.response, function (beacon) {
                return _.assign(beacon, {'id': id++});
            });

            // build new map
            this.beacons = {};
            this.beacons = _.indexBy(_beacons, 'id');
            this.nextId = id;

            this.emitChange();
        },

        listInstances: function (r) {
            this.instances[r.id.toString()] = r.response;
            this.emitChange();
        },

        // State access
        exports: {
            getBeacon: function (bid) {
                return this.beacons[bid.toString()];
            },

            getBeacons: function () {
                return this.beacons;
            },

            getInstances: function (beacon) {
                if (beacon === undefined) {
                    return this.instances;
                }

                var id = beacon.id;
                if ((id !== undefined) && this.instances[id.toString()]) {
                    return this.instances[id.toString()];
                }
                else {
                    return [];
                }
            }
        }
    };
}

module.exports = beaconModel;
