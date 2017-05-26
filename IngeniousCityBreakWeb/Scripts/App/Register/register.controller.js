var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RegisterController = (function (_super) {
    __extends(RegisterController, _super);
    function RegisterController($window, $http) {
        _super.call(this, $window, $http);
        this.Initialize();
        this.Model = new RegisterModel();
    }
    RegisterController.prototype.RegisterClick = function () {
        debugger;
        var self = this;
        self.Model.ErrorAlert = false;
        if (self.Model.Email == null) {
            self.Model.ErrorMessage = "Your Email field is blank!";
            self.Model.ErrorAlert = true;
            return;
        }
        debugger;
        if (self.Model.Password !== self.Model.ConfirmPassword) {
            self.Model.ErrorMessage = "The password must be the same!";
            self.Model.ErrorAlert = true;
            return;
        }
        debugger;
        if (self.EmailValidator(self.Model.Email) !== true) {
            self.Model.ErrorMessage = "Email address is not valid!";
            self.Model.ErrorAlert = true;
            return;
        }
        debugger;
        if (self.PasswordValidator(self.Model.Password) !== true) {
            self.Model.ErrorMessage = "Password is not valid!";
            self.Model.ErrorAlert = true;
            return;
        }
        debugger;
        var config = {
            headers: {
                "dataType": "json",
                "contentType": "application/json"
            }
        };
        debugger;
        this.HttpService.post('api/Account/Register', {
            "Email": self.Model.Email,
            "Password": self.Model.Password,
            "ConfirmPassword": self.Model.ConfirmPassword,
        }).then(function (response) {
            debugger;
            self.Window.location.href = '/index.html#!/home';
            self.Model.ErrorMessage = "You have successfully registered";
        }).catch(function (response) {
            self.Model.ErrorMessage = response.data.Message;
        });
    };
    RegisterController.prototype.Initialize = function () {
        //load css & script
        var _this = this;
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
            //this.LoadScript("Content/Theme/js/jquery-1.11.0.min.js");
            _this.LoadScript("http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js");
            _this.LoadScript("Content/Theme/js/jquery.cookie.js ");
            _this.LoadScript("Content/Theme/js/waypoints.min.js ");
            _this.LoadScript("Content/Theme/js/jquery.counterup.min.js ");
            _this.LoadScript("Content/Theme/js/jquery.parallax-1.1.3.js ");
            _this.LoadScript("Content/Theme/js/front.js");
        });
    };
    RegisterController.prototype.LoadScript = function (url, callback) {
        if (callback === void 0) { callback = null; }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = callback;
        head.appendChild(script);
    };
    RegisterController.prototype.LoadCss = function (url) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.media = 'all';
        head.appendChild(link);
    };
    return RegisterController;
}(LoginController));
var RegisterModel = (function () {
    function RegisterModel() {
    }
    return RegisterModel;
}());
