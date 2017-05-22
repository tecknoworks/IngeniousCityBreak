class BaseController {
	protected currentUser: UserModel = null;
	//public Model: BaseModel;
	protected IWindowService: ng.IWindowService;

	constructor($window: ng.IWindowService) {
		this.IWindowService = $window;
		//this.Model = new BaseModel();
		if (localStorage.getItem('IngeniousCityBreakUser') != null) {
			this.currentUser = JSON.parse(localStorage.getItem('IngeniousCityBreakUser'));
			//this.Model.currentUser = JSON.parse(localStorage.getItem('IngeniousCityBreakUser'));
		}

	}
	public LogOutClick() {
		localStorage.removeItem('IngeniousCityBreakUser');
		this.currentUser = null;
		this.IWindowService.location.href = '/index.html#!/home';
	}

}
/*class BaseModel {
	public currentUser: UserModel;
	constructor() { }

}*/