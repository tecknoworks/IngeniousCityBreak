class LoginController {
	public Model: LoginModel;
	protected HttpService: ng.IHttpService;
	constructor($window: ng.IWindowService, $http: ng.IHttpService) {
		this.HttpService = $http;
		this.Model = new LoginModel();
	}

	public LoginClick(): void {
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