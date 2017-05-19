var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginController = (function (_super) {
    __extends(LoginController, _super);
    function LoginController($window, $http) {
        _super.call(this, $window);
        this.HttpService = $http;
        this.Window = $window;
        this.Model1 = new LoginModel();
    }
    LoginController.prototype.LoginClick = function () {
        var self = this;
        this.Model1.ErrorAlert = false;
        debugger;
        if (self.Model1.Email == null) {
            self.Model1.ErrorMessage = "Your email field is blank!";
            self.Model1.ErrorAlert = true;
            return;
        }
        debugger;
        if (self.EmailValidator((self.Model1).Email) !== true) {
            self.Model1.ErrorMessage = "Email address is not valid!";
            self.Model1.ErrorAlert = true;
            debugger;
            return;
        }
        if (self.PasswordValidator(self.Model1.Password) !== true) {
            self.Model1.ErrorMessage = "Password is not valid!";
            self.Model1.ErrorAlert = true;
            debugger;
            return;
        }
        var config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        debugger;
        var data = "username=" + self.Model1.Email + "&password=" + self.Model1.Password + "&grant_type=password";
        this.HttpService.post('/token', data).then(function (response) {
            debugger;
            var user = new UserModel();
            //var result: any = response.data;
            var result = response.data;
            user.UserName = result.userName;
            user.AccessToken = result.access_token;
            user.TokenType = result.token_type;
            var userJson = JSON.stringify(user);
            localStorage.setItem('IngeniousCityBreakUser', userJson);
            self.Model1.ErrorMessage = "You are now logged in! ";
            self.Window.location.href = '/index.html#!/home';
            debugger;
        }).catch(function (response) {
            debugger;
            self.Model1.ErrorMessage = response.data.Message;
        });
    };
    LoginController.prototype.EmailValidator = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    LoginController.prototype.PasswordValidator = function (password) {
        var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return re.test(password);
    };
    return LoginController;
}(BaseController));
var LoginModel = (function () {
    function LoginModel() {
    }
    return LoginModel;
}());
var UserModel = (function () {
    function UserModel() {
    }
    return UserModel;
}());
var UserDto = (function () {
    function UserDto() {
    }
    return UserDto;
}());
//# sourceMappingURL=login.controller.js.map