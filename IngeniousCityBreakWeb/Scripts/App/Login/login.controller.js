var LoginController = (function () {
    function LoginController($window, $http) {
        this.HttpService = $http;
        this.LoginM = new LoginModel();
    }
    LoginController.prototype.LoginClick = function () {
        var self = this;
        this.LoginM.ErrorAlert = false;
        if (self.LoginM.Email == null) {
            self.LoginM.ErrorMessage = "Your email field is blank";
            self.LoginM.ErrorAlert = true;
            return;
        }
        if (self.EmailValidator((self.LoginM).Email) !== true) {
            self.LoginM.ErrorMessage = "Email address is not valid!";
            self.LoginM.ErrorAlert = true;
            return;
        }
        if (self.PasswordValidator(self.LoginM.Password) !== true) {
            self.LoginM.ErrorMessage = "Password is not valid!";
            self.LoginM.ErrorAlert = true;
            return;
        }
        //this.HttpService.post("/Token")
        //	.then((response) => {
        //	});
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
}());
var LoginModel = (function () {
    function LoginModel() {
    }
    return LoginModel;
}());
