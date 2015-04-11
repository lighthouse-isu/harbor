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
  * deployModel.js
  * Maintains streaming state as applications are deployed
  * and/or updated.
  */

function deployModel() {
    'use strict';

    return {
        good: true,
        streamLog: [],

        handlers: {
            'deployStream.update': 'update',
            'deployStream.fail': 'fail'
        },

        update: function (status) {
            this.streamLog.push(status);
            this.emitChange();
        },

        fail: function (error) {
            this.good = false;
            this.emitChange();
        },

        exports: {
            log: function () {
                return this.streamLog;
            },

            isGood: function () {
                return this.good;
            }
        }
    };
}

module.exports = deployModel;