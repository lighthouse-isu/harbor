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

var _ = require('lodash');

function appController($scope, $rootScope, appListModel, deployService) {
    'use strict';

    $scope.showHistory = false;
    deployService.detail($scope.info.Id);

    $scope.$listenTo(appListModel, function () {
        $scope.detail = appListModel.detail($scope.info.Id);
        $scope.recent = _.first($scope.detail);
    });

    $scope.start = function (id) {
        deployService.start(id, $scope.info.Name);
    };

    $scope.stop = function (id) {
        deployService.stop(id, $scope.info.Name);
    };

    $scope.revert = function (target) {
        // Publish target ID for the revert controller
        $rootScope.$broadcast('deploy.revert', {
            'id': $scope.info.Id,
            'target': target,
            'name': $scope.info.Name
        });
    };

    $scope.update = function () {
        // Publish recent deployment for the update controller
        // patching in the Instances list of the top-level app info
        var apps = appListModel.apps();
        $scope.recent.Instances = _.findWhere(apps, {'Id': $scope.info.Id}).Instances;

        $rootScope.$broadcast('deploy.update', {
            'id': $scope.info.Id,
            'name': $scope.info.Name,
            'recent': $scope.recent
        });
    };
}

appController.$inject = ['$scope', '$rootScope', 'appListModel', 'deployService'];
module.exports = appController;
