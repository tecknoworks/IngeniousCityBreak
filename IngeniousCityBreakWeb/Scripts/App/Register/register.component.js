'use strict';
//Register `register` component,along with its associated controller and template
angular.
    module('register').
    component('register', {
    templateUrl: 'scripts/app/Register/register.template.html',
    controller: ['$window', '$http', RegisterController]
});
