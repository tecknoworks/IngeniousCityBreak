class UserProfileController extends BaseController {
	protected HttpService: ng.IHttpService;
	public UPModel: UserProfileModel;

	constructor($window: ng.IWindowService, $http: ng.IHttpService) {
		super($window);
		this.HttpService = $http;
		this.UPModel = new UserProfileModel();
		this.Initialize();
		if (this.currentUser == null)
			this.IWindowService.location.href = '/index.html#!/home';
	}

	public SavePasswordClick(): void {


	}

	public SaveClick(): void {




	}

	protected Initialize(): void {
		//load css & script
		setTimeout(() => {

			this.LoadScript("http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,500,700,800");
			this.LoadScript("http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css");
			this.LoadScript("http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css");
			this.LoadCss("Content/Theme/css/animate.css");
			this.LoadCss("Content/Theme/css/style.default.css");
			this.LoadCss("Content/Theme/css/custom.css");
			this.LoadScript("https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js");
			this.LoadScript("https://oss.maxcdn.com/respond/1.4.2/respond.min.js");
			this.LoadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js");
			this.LoadScript("http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js");
			this.LoadScript("Content/Theme/js/jquery.cookie.js");
			this.LoadScript("Content/Theme/js/waypoints.min.js");
			this.LoadScript("Content/Theme/js/jquery.counterup.min.js");
			this.LoadScript("Content/Theme/js/jquery.parallax-1.1.3.js");
			this.LoadScript("Content/Theme/js/front.js");

        });

	}

	protected LoadScript(url: string, callback = null): void {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        script.onload = callback;

        head.appendChild(script);
    }

    protected LoadCss(url: string): void {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.media = 'all';
        head.appendChild(link);
    }

}
class UserProfileModel {
	public OldPassword: string;
	public NewPassword: string;
	public RetypeNewPassword: string;

	public Email: string;
	public FirstName: string;
	public LastName: string;
	public Country: string;
	public City: string;
	public Address: string;
	public Telephone: number;

	public ErrorMessage: string;
	public ErrorAlert: boolean;
	constructor() { }
}