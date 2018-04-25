angular.
    module('employeeDetail').
    component('employeeDetail', {
        templateUrl: '/app/employee-detail/employee-detail.template.html',
        controller: ['$routeParams', '$scope', '$http', '$location', function EmployeeListController($routeParams, $scope, $http, $location) {
            $scope.save = function (employee) {
                //$scope.master = angular.copy(employee);
                $http.post('/api/employees', JSON.stringify(employee)).then(function (response) {
                    if (response.data.id) {
                        $scope.employee = response.data;
                        $location.path('/employees/' + $scope.employee.id);
                    }
                });
            };
            if ($routeParams.employeeId != "create") {
                $http.get('/api/employees/' + $routeParams.employeeId).then(function (response) {
                    $scope.employee = response.data;
                });
            }
        }]
    });