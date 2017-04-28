var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HomeModel = (function () {
    function HomeModel() {
    }
    return HomeModel;
}());
var TouristAttractionDto = (function () {
    function TouristAttractionDto() {
    }
    return TouristAttractionDto;
}());
var TouristAttractionModel = (function (_super) {
    __extends(TouristAttractionModel, _super);
    function TouristAttractionModel() {
        _super.call(this);
    }
    TouristAttractionModel.prototype.FromDto = function (dto) {
        this.IdTouristAttraction = dto.IdTouristAttraction;
        this.Name = dto.Name;
        this.Image = dto.Image;
        this.PriceAdult = dto.PriceAdult;
        this.PriceChild = dto.PriceChild;
        this.Schedule = dto.Schedule;
    };
    return TouristAttractionModel;
}(TouristAttractionDto));
var HomeController = (function () {
    function HomeController($window) {
        this.windowService = $window;
        this.Model = new HomeModel();
        this.Model.Display = "Can't change";
        this.Model.Edit = "Do change";
        $.ajax({
            method: "GET",
            url: "/api/TouristAttraction",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                var modelList = new Array();
                for (var i = 0; i < data.length; i++) {
                    var model = new TouristAttractionModel();
                    model.FromDto(data[i]);
                    modelList.push(model);
                }
            }
        });
        this.Initialize();
    }
    HomeController.prototype.DoSomething = function () {
        this.Model.Display = "Changed";
        this.Model.Edit = "Changed";
    };
    HomeController.prototype.Initialize = function () {
        var _this = this;
        setTimeout(function () {
            _this.LoadCss("Content/Theme/css/owl.theme.css");
            //load script
            _this.LoadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js");
            _this.LoadScript("http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js");
            _this.LoadScript("Content/Theme/js/jquery.cookie.js");
            _this.LoadScript("Content/Theme/js/waypoints.min.js");
            _this.LoadScript("Content/Theme/js/jquery.counterup.min.js");
            _this.LoadScript("Content/Theme/js/jquery.parallax-1.1.3.js");
            _this.LoadScript("Content/Theme/js/owl.carousel.min.js");
            _this.LoadScript("Content/Theme/js/front.js");
            _this.LoadScript("Content/Theme/js/jquery.cookie.js");
        });
    };
    HomeController.prototype.LoadScript = function (url, callback) {
        if (callback === void 0) { callback = null; }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = callback;
        head.appendChild(script);
    };
    HomeController.prototype.LoadCss = function (url) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.media = 'all';
        head.appendChild(link);
    };
    return HomeController;
}());
