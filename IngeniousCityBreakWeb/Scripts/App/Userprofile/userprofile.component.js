'use strict';
// userprofile `userprofile` component, along with its associated controller and template
angular.
    module('userprofile').
    component('userprofile', {
    templateUrl: 'scripts/app/userprofile/userprofile.template.html',
    controller: ['$window', '$http', UserProfileController]
});
