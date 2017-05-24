'use strict';
angular.
    module('ingeniousCityBreakApp').
    config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.
            when('/home', {
            template: '<home></home>'
        }).
            when('/register', {
            template: '<register></register>'
        }).
            //when('/login', {
            //	template: '<login></login>'
            //}).
            when('/userprofile', {
            template: '<userprofile></userprofile>'
        }).
            otherwise('/home');
    }
]);
//# sourceMappingURL=app.config.js.map