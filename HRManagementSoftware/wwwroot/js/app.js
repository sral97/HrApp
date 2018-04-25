var hrApp = angular.module('hrApp', []);

hrApp.controller('EmployeeController', function EmployeeController($scope) {
    $scope.employees = [
        {
            firstName: 'Lars',
            lastName: 'Müller',
            age: 20
        }, {
            firstName: 'Max',
            lastName: 'Mustermann',
            age: 15
        }
    ];
})