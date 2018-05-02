angular.
    module('employeeDeleteList').
    component('employeeDeleteList', {
        templateUrl: '/app/employee-delete-list/employee-delete-list.template.html',
        controller: ['$http', '$scope', function EmployeeDeleteListController($http, $scope) {
            var self = this;

            $scope.deleteSelectedEmployees = function () {
                var checkBoxes = document.getElementsByClassName('toDelete');
                for (var i = 0; i < checkBoxes.length; i++) {
                    if (checkBoxes[i].checked) {
                        var employeeId = checkBoxes[i].attributes['data-employee-id'].value;
                        $http.delete('/api/employees/' + employeeId).then(function () {
                            $http.get('/api/employees').then(function (response) {
                                $scope.employees = response.data;
                            });
                        });
                    }
                }
            }

            $http.get('/api/employees').then(function (response) {
                $scope.employees = response.data;
            });
        }]
    });