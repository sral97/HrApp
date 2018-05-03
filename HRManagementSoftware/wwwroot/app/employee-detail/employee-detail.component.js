angular.
    module('employeeDetail').
    component('employeeDetail', {
        templateUrl: '/app/employee-detail/employee-detail.template.html',
        controller: ['$routeParams', '$scope', '$http', '$location', function EmployeeListController($routeParams, $scope, $http, $location) {
            $scope.save = function (employee) {
                var method = 'POST';
                var url = '/api/employees';
                var expectedResponse = 201;
                if ($routeParams.employeeId !== 'create') {
                    method = 'PUT';
                    url = url + '/' + employee.id;
                    expectedResponse = 204;
                }
                $http({
                    method: method,
                    url: url,
                    data: JSON.stringify(employee)
                }).then(function (response) {
                    console.log(response);
                    if (response.status = expectedResponse) {
                        $location.path('/employees');
                    }
                });
                return false;
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