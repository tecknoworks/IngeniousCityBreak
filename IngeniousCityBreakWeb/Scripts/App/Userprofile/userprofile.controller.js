var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UserProfileController = (function (_super) {
    __extends(UserProfileController, _super);
    function UserProfileController($window, $http) {
        _super.call(this, $window);
        this.HttpService = $http;
        this.UPModel = new UserProfileModel();
        this.Initialize();
        if (this.currentUser == null)
            this.IWindowService.location.href = '/index.html#!/home';
    }
    UserProfileController.prototype.SavePasswordClick = function () {
    };
    UserProfileController.prototype.SaveClick = function () {
    };
    UserProfileController.prototype.Initialize = function () {
        var _this = this;
        //load css & script
        setTimeout(function () {
            _this.LoadScript("http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,500,700,800");
            _this.LoadScript("http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css");
            _this.LoadScript("http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css");
            _this.LoadCss("Content/Theme/css/animate.css");
            _this.LoadCss("Content/Theme/css/style.default.css");
            _this.LoadCss("Content/Theme/css/custom.css");
            _this.LoadScript("https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js");
            _this.LoadScript("https://oss.maxcdn.com/respond/1.4.2/respond.min.js");
            _this.LoadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js");
            _this.LoadScript("http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js");
            _this.LoadScript("Content/Theme/js/jquery.cookie.js");
            _this.LoadScript("Content/Theme/js/waypoints.min.js");
            _this.LoadScript("Content/Theme/js/jquery.counterup.min.js");
            _this.LoadScript("Content/Theme/js/jquery.parallax-1.1.3.js");
            _this.LoadScript("Content/Theme/js/front.js");
        });
    };
    UserProfileController.prototype.LoadScript = function (url, callback) {
        if (callback === void 0) { callback = null; }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = callback;
        head.appendChild(script);
    };
    UserProfileController.prototype.LoadCss = function (url) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.media = 'all';
        head.appendChild(link);
    };
    return UserProfileController;
}(BaseController));
var UserProfileModel = (function () {
    function UserProfileModel() {
    }
    return UserProfileModel;
}());
//# sourceMappingURL=userprofile.controller.js.map