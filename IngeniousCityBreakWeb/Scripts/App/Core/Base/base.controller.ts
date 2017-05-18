class BaseController {
	protected currentUser: UserModel = null;
	protected IWindowService: ng.IWindowService;

	constructor($window: ng.IWindowService) {
		this.IWindowService = $window;
		if (localStorage.getItem('IngeniousCityBreakUser') != null) {
			this.currentUser = JSON.parse(localStorage.getItem('IngeniousCityBreakUser'));
		}

	}
	public LogOutClick() {
		localStorage.removeItem('IngeniousCityBreakUser');
		this.IWindowService.location.href = '/index.html#!/home';
	}

}