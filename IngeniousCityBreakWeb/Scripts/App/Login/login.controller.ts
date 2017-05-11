class LoginController {
	public LoginM: LoginModel;
	protected HttpService: ng.IHttpService;
	constructor($window: ng.IWindowService, $http: ng.IHttpService) {
		this.HttpService = $http;
		this.LoginM = new LoginModel();
	}

	public LoginClick(): void {
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
	}

	protected EmailValidator(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
	}

	protected PasswordValidator(password) {
		var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return re.test(password);
	}
}
class LoginModel {
	public Email: string;
	public Password: string;
	public ErrorMessage: string;
	public ErrorAlert: boolean;
	constructor() { }
}