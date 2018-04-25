angular.
    module('hrApp').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/employees', {
                    template: '<employee-list></employee-list>'
                }).
                when('/employees/:employeeId', {
                    template: '<employee-detail></employee-detail>'
                }).
                otherwise('/employees');
        }
    ]);