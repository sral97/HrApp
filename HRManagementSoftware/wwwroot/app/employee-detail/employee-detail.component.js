﻿angular.
    module('employeeDetail').
    component('employeeDetail', {
        templateUrl: '/app/employee-detail/employee-detail.template.html',
        controller: ['$routeParams', '$scope', '$http', '$location', function EmployeeListController($routeParams, $scope, $http, $location) {
            $scope.save = function (employee) {
                console.log(employee);
                var method = 'POST';
                var url = '/api/employees';
                if ($routeParams.employeeId !== 'create') {
                    method = 'PUT';
                    url = url + '/' + employee.id;
                }
                $http({
                    method: method,
                    url: url,
                    data: JSON.stringify(employee)
                }).then(function (response) {
                    if (response.data.id) {
                        $scope.employee = response.data;
                        $location.path('/employees/' + $scope.employee.id);
                    }
                });
            };
            $scope.addAddress = function (employee) {
                employee.addresses.push({
                    'street' : '',
                    'zip' : '',
                    'city' : '',
                    'state' : '',
                })
            }
            $scope.removeAddress = function (address) {
                $scope.employee.addresses = $scope.employee.addresses.filter(function (item) {
                    return item !== address;
                });
            };
            if ($routeParams.employeeId !== 'create') {
                $http.get('/api/employees/' + $routeParams.employeeId).then(function (response) {
                    $scope.employee = response.data;
                });
            } else {
                $scope.employee = {
                    firstName: '',
                    lastName: '',
                    age: '',
                    addresses: [{
                        'street': '',
                        'zip': '',
                        'city': '',
                        'state': '',
                    }],
                }
            }
        }]
    });