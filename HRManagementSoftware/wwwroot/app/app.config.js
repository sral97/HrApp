angular.
    module('hrApp').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/employees', {
                    template: '<employee-list class="col"></employee-list>'
                }).
                when('/employees/delete', {
                    template: '<employee-delete-list class="col"></employee-delete-list>'
                }).
                when('/employees/:employeeId', {
                    template: '<employee-detail class="col"></employee-detail>'
                }).
                otherwise('/employees');
        }
    ]);