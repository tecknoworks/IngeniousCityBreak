var BaseController = (function () {
    function BaseController($window) {
        this.currentUser = null;
        this.IWindowService = $window;
        if (localStorage.getItem('IngeniousCityBreakUser') != null) {
            this.currentUser = JSON.parse(localStorage.getItem('IngeniousCityBreakUser'));
        }
    }
    BaseController.prototype.LogOutClick = function () {
        localStorage.removeItem('IngeniousCityBreakUser');
        this.currentUser = null;
        this.IWindowService.location.href = '/index.html#!/home';
    };
    return BaseController;
}());
