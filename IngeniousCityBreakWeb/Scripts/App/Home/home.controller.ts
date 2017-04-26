class HomeController {
    public Model: HomeModel;
    protected windowService: ng.IWindowService
    constructor($window: ng.IWindowService) {
        this.windowService = $window;

        this.Model = new HomeModel();

        this.Model.Display = "Can't change";
        this.Model.Edit = "Do change";

        $.ajax({
            method: "GET",
            url: "test.js",
            dataType: "json",
            success: (json) => {
                //var a:HomeDto = JSON.parse(json)
                //this.Model.Display = 
            }
        });
    }

    public DoSomething(): void {
        this.Model.Display = "Changed";
        this.Model.Edit = "Changed";
    }
}

class HomeModel {
    public Display: string;
    public Edit: string;
}

class HomeDto {
}