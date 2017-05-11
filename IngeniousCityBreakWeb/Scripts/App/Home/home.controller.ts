class HomeModel {
    //public Display: string;
    //public Edit: string;
    public TouristAttractionList: Array<TouristAttractionModel>;
    constructor() {
        this.TouristAttractionList = new Array<TouristAttractionModel>();
    }
}

class TouristAttractionDto {
    IdTouristAttraction: number;
    Image: string;
    Name: string;
    PriceAdult: number;
    PriceChild: number;
    Schedule: string;

    constructor() {
    }
}

class TouristAttractionModel extends TouristAttractionDto {
    constructor() {
        super();
    }

    public FromDto(dto: TouristAttractionDto): void {
        this.IdTouristAttraction = dto.IdTouristAttraction;
        this.Name = dto.Name;
        this.Image = dto.Image;
        this.PriceAdult = dto.PriceAdult;
        this.PriceChild = dto.PriceChild;
        this.Schedule = dto.Schedule;
    }
}

class HomeController {
    public Model: HomeModel;
    protected windowService: ng.IWindowService
    protected httpService: ng.IHttpService;
    constructor($window: ng.IWindowService, $http: ng.IHttpService) {
        var self = this;
        this.httpService = $http;
        this.windowService = $window;

        this.Model = new HomeModel();

        //this.Model.Display = "Can't change";
        //this.Model.Edit = "Do change";

        this.httpService.get("/api/TouristAttraction")
            .then((response) => {
                var data: Array<TouristAttractionDto> = <Array<TouristAttractionDto>>response.data;
                for (var i: number = 0; i < data.length; i++) {
                    var model: TouristAttractionModel = new TouristAttractionModel();
                    model.FromDto(data[i]);
                    self.Model.TouristAttractionList.push(model);
                }
            });

        this.Initialize();
    }


    public DoSomething(): void {
        //this.Model.Display = "Changed";
        //this.Model.Edit = "Changed";
    }

    protected Initialize(): void {
		
        setTimeout(()=> {

			this.LoadCss('<link href="https://fonts.googleapis.com/css?family=Roboto:400,700,900,900i" rel="stylesheet">');
            this.LoadCss("Content/Theme/css/owl.theme.css");

            //load script
			this.LoadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js");
			this.LoadScript("http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js");
			this.LoadScript("Content/Theme/js/jquery.cookie.js");
            
            this.LoadScript("Content/Theme/js/waypoints.min.js");
            this.LoadScript("Content/Theme/js/jquery.counterup.min.js");
            this.LoadScript("Content/Theme/js/jquery.parallax-1.1.3.js");

            this.LoadScript("Content/Theme/js/owl.carousel.min.js");
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
