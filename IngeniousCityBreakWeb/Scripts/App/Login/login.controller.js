var LoginController = (function () {
    function LoginController($window, $http) {
        this.HttpService = $http;
        this.Model = new LoginModel();
    }
    LoginController.prototype.LoginClick = function () {
        var self = this;
        this.Model.ErrorAlert = false;
        if (self.Model.Email == null) {
            self.Model.ErrorMessage = "Your email field is blank";
            self.Model.ErrorAlert = true;
            return;
        }
        if (self.EmailValidator((self.LoginM).Email) !== true) {
            self.Model.ErrorMessage = "Email address is not valid!";
            self.Model.ErrorAlert = true;
            return;
        }
        if (self.PasswordValidator(self.LoginM.Password) !== true) {
            self.Model.ErrorMessage = "Password is not valid!";
            self.Model.ErrorAlert = true;
            return;
        }
        var data = {
            email: self.Model.Email,
            password: self.Model.Password
        };
        self.HttpService({
            method: 'POST',
            url: '/token',
            data: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        //this.HttpService.post("/Token",data)
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
