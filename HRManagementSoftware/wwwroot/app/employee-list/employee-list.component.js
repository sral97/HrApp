angular.
    module('employeeList').
    component('employeeList', {
        templateUrl: '/app/employee-list/employee-list.template.html',
        controller: ['$http', function EmployeeListController($http) {
            var self = this;

            $http.get('/api/employees').then(function (response) {
                self.employees = response.data;
            });
        }]
    });