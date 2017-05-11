'use strict';
// Register `home` component, along with its associated controller and template
angular.
    module('map').
    component('map', {
    templateUrl: 'scripts/app/Map/map.template.html',
    controller: ['$window', '$http', MapService]
});
//# sourceMappingURL=map.component.js.map