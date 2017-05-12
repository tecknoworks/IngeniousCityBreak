'use strict';
// Register `home` component, along with its associated controller and template
angular.
    module('home').
    component('home', {
    templateUrl: 'scripts/app/Home/home.template.html',
    controller: ['$window', '$http', HomeController]
});
