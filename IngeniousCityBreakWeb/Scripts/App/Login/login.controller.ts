﻿

class LoginController extends BaseController {
	public Model1: LoginModel;
	//public User: UserModel;
	protected HttpService: ng.IHttpService;
	protected Window: ng.IWindowService;
	constructor($window: ng.IWindowService, $http: ng.IHttpService) {
		super($window);
		this.HttpService = $http;
		this.Window = $window;
		this.Model1 = new LoginModel();
	}


	public LoginClick(): void {
		var self = this;
		this.Model1.ErrorAlert = false;
		debugger
		if (self.Model1.Email == null) {
			self.Model1.ErrorMessage = "Your email field is blank!";
			self.Model1.ErrorAlert = true;
			return;
		}
		debugger
		if (self.EmailValidator((self.Model1).Email) !== true) {
			self.Model1.ErrorMessage = "Email address is not valid!";
            self.Model1.ErrorAlert = true;
			debugger
            return;
		}
		if (self.PasswordValidator(self.Model1.Password) !== true) {
            self.Model1.ErrorMessage = "Password is not valid!";
            self.Model1.ErrorAlert = true;
			debugger
            return;
        }

		var config: angular.IRequestShortcutConfig = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
		debugger


		var data = "username=" + self.Model1.Email + "&password=" + self.Model1.Password + "&grant_type=password";
		this.HttpService.post('/token', data).then(function (response) {
			debugger

			var user: UserModel = new UserModel();
			//var result: any = response.data;

			var result: UserDto = <UserDto>response.data;

			user.UserName = result.userName;
			user.AccessToken = result.access_token;
			user.TokenType = result.token_type;

			var userJson = JSON.stringify(user);
			localStorage.setItem('IngeniousCityBreakUser', userJson);


			self.Model1.ErrorMessage = "You are now logged in! ";
			self.Window.location.href = '/index.html#!/home';
           
			debugger
			}).catch(function (response) {
				debugger
			self.Model1.ErrorMessage = response.data.Message;
		});

		
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

class UserModel {
	public UserName: string;
	public AccessToken: string;
	public TokenType: string;
	constructor() { }
}

class UserDto {
	public userName: string;
	public access_token: string;
	public token_type: string;
	
	constructor() { }
}
