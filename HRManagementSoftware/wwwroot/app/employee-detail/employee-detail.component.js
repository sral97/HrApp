angular.
    module('employeeDetail').
    component('employeeDetail', {
        templateUrl: '/app/employee-detail/employee-detail.template.html',
        controller: ['$routeParams', '$http', function EmployeeListController($routeParams, $http) {
            var self = this;

            $http.get('/api/employees/' + $routeParams.employeeId).then(function (response) {
                self.employee = response.data;
            });
        }]
    });