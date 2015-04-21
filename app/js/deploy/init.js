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

var deployController = require('./deployController'),
    deployDirective = require('./deployDirective'),
    deployError = require('./deployError'),
    deployMonitorController = require('./monitor/deployMonitorController'),
    deployMonitorDirective = require('./monitor/deployMonitorDirective'),
    deployModel = require('./deployModel'),
    deployService = require('./deployService');

var deploy = angular.module('lighthouse.deploy', []);

deploy.controller('deployController', deployController);
deploy.controller('deployMonitorController', deployMonitorController);

deploy.directive('deployer', deployDirective);
deploy.directive('deployMonitor', deployMonitorDirective);

deploy.factory('deployError', deployError);
deploy.factory('deployService', deployService);
deploy.store('deployModel', deployModel);

module.exports = deploy;