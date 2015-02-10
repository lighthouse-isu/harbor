/*
 * alerts/alertController.js
 * Listens for alert actions and updates directive scope.
 */

function alertController($scope, alertModel) {
    'use strict';

    $scope.$listenTo(alertModel, function () {
        $scope.alerts = alertModel.getAll();
    });

    // $scope.dismiss() can remove an alert early
}

alertController.$inject = ['$scope', 'alertModel'];
module.exports = alertController;