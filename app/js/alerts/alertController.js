/*
 * alerts/alertController.js
 * Listens for alert actions and updates directive scope.
 */

function alertController($scope, alertModel, alertService) {
    'use strict';

    $scope.$listenTo(alertModel, function () {
        $scope.alerts = alertModel.getAll();
    });

    $scope.dismiss = function (id) {
        alertService.dismiss(id);
    };
}

alertController.$inject = ['$scope', 'alertModel', 'alertService'];
module.exports = alertController;