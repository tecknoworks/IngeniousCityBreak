var HomeController = (function () {
    function HomeController($window) {
        this.windowService = $window;
        this.Model = new HomeModel();
        this.Model.Display = "Can't change";
        this.Model.Edit = "Do change";
        $.ajax({
            method: "GET",
            url: "test.js",
            dataType: "json",
            success: function (json) {
                //var a:HomeDto = JSON.parse(json)
                //this.Model.Display = 
            }
        });
        //----------------------------------------
    }
    HomeController.prototype.DoSomething = function () {
        this.Model.Display = "Changed";
        this.Model.Edit = "Changed";
    };
    return HomeController;
}());
var HomeModel = (function () {
    function HomeModel() {
    }
    return HomeModel;
}());
var HomeDto = (function () {
    function HomeDto() {
    }
    return HomeDto;
}());
//# sourceMappingURL=home.controller.js.map