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
 * userController
 * Main user view control.
 */
function userController($scope, userModel, alertService, userService) {
    'use strict';
    // Init
    userService.getUsers();

    // New user parameters
    $scope.new = {
        email: '',
        password: ''
    };

    $scope.users = [];

    // Form control / validation
    $scope.submitting = false;
    $scope.form = { submitted: false };

    $scope.$listenTo(userModel, function () {
        $scope.users = userModel.getUsers();
    });

    $scope.open = function () {
        $scope.submitting = true;
    };

    $scope.close = function () {
        $scope.submitting = false;
        $scope.form.submitted = false;
        $scope.new.email = '';
        $scope.new.password = '';
    };

    $scope.create = function () {
        if ($scope.userForm.$valid) {
            userService.createUser({
                Email: $scope.new.email,
                Password: $scope.new.password
            });

            $scope.close();
        }
        else {
            var message = '';
            if ($scope.userForm.email.$error.required) {
                message = 'Please provide an email.';
            }
            else if ($scope.userForm.password.$error.required) {
                message = 'Please provide a password.';
            }

            alertService.create({
                message: message,
                type: 'danger',
                timeout: 2
            });

            $scope.form.submitted = true;
        }
    };
}

userController.$inject = ['$scope', 'userModel', 'alertService', 'userService'];
module.exports = userController;
