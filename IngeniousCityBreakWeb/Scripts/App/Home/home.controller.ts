class RouteDataItemModel {
    Lat: number;
    Long: number;

    constructor(lat, long) {
        this.Lat = lat;
        this.Long = long;
    }
}

class MyMarker extends google.maps.Marker {
    id: number;
    constructor(opts?: google.maps.MarkerOptions) {
        super(opts);
    }

    public GetRouteDataItemModel(): RouteDataItemModel {
        return new RouteDataItemModel(this.getPosition().lat(), this.getPosition().lng());
    }
}

class MyPolyline extends google.maps.Polyline {
    idP: number;
    constructor(opts?: google.maps.PolylineOptions) {
        super(opts);
    }
}

class MapService {
    protected myMap: google.maps.Map;
    markers: LinkedList;
    constructor() {
        var self = this;

        var mapOptions: google.maps.MapOptions = <google.maps.MapOptions>{
            center: new google.maps.LatLng(21.0000, 78.0000),
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var uniqueId = 1; //sus
        this.myMap = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        this.markers = new LinkedList(this.myMap);

        google.maps.event.addListener(this.myMap, 'click', (e) => {
            //Determine the location where the user has clicked.
            var location = e.latLng;

            //Create a marker and placed it on the map.
            var markerOptions: google.maps.MarkerOptions = <google.maps.MarkerOptions>{
                position: location,
                map: this.myMap
            };
            var marker = new MyMarker(markerOptions);
            //Set unique id
            marker.id = uniqueId;
            uniqueId++;
            this.markers.insertLink(marker);
            //Attach click event handler to the marker.

            var latlng = location.lat() + "," + location.lng();
            var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.lat() + ',' + location.lng() + '&sensor=true';
            google.maps.event.addListener(marker, "click", (e) => {
                var content = 'Latitude: ' + location.lat() + '<br />Longitude: ' + location.lng();
                content += "<br /><input type = 'button' value = 'Delete' id='removeMarkerBtn1' marker='" + marker.id + "' value = 'Delete' />";
                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });
                infoWindow.open(this.myMap, marker);
                setTimeout(() => {
                    $("#removeMarkerBtn1").click((e) => {
                        var myMarker = this.markers.searchNode(marker);
                        if ((myMarker == this.markers.first) && (this.markers.first == this.markers.last)) {
                            this.markers.removeMarker(myMarker.value);
                            myMarker.value.setMap(null);
                        }
                        else
                            if ((myMarker == this.markers.first) && (this.markers.first != this.markers.last)) {
                                this.markers.first.line.setMap(null);
                                this.markers.removeMarker(myMarker.value);
                                myMarker.value.setMap(null);
                            }
                            else if ((myMarker == this.markers.last) && (this.markers.last != this.markers.first)) {
                                this.markers.last.prevNode.line.setMap(null);
                                this.markers.removeMarker(myMarker.value);
                                myMarker.value.setMap(null);
                            }
                            else {
                                var startpoint = { "lat": myMarker.prevNode.value.getPosition().lat(), "long": myMarker.prevNode.value.getPosition().lng() };
                                var endpoint = { "lat": myMarker.nextNode.value.getPosition().lat(), "long": myMarker.nextNode.value.getPosition().lng() };
                                var locationlinks = [
                                    new google.maps.LatLng(startpoint.lat, startpoint.long),
                                    new google.maps.LatLng(endpoint.lat, endpoint.long)
                                ];
                                debugger
                                var lineOptions: google.maps.PolylineOptions = <google.maps.PolylineOptions>{
                                    path: locationlinks,
                                    geodesic: true,
                                    strokeColor: '#FF0000',
                                    strokeOpacity: 1.0,
                                    strokeWeight: 2
                                };
                                var flightPath = new MyPolyline(lineOptions);
                                var mark = myMarker;
                                myMarker.prevNode.line.setMap(null);
                                myMarker.line.setMap(null);
                                this.markers.removeMarker(myMarker.value);
                                mark.value.setMap(null);
                                mark.prevNode.line = flightPath;
                                mark.prevNode.line.setMap(this.myMap);
                            }

                    });

                }, 300);
            });
            var node = this.markers.last;
            if (this.markers.first != this.markers.last) {
                var node = this.markers.last.prevNode;
                var startpoint = { "lat": node.value.getPosition().lat(), "long": node.value.getPosition().lng() };
                var endpoint = { "lat": this.markers.last.value.getPosition().lat(), "long": this.markers.last.value.getPosition().lng() };
                var locationlinks = [
                    new google.maps.LatLng(startpoint.lat, startpoint.long),
                    new google.maps.LatLng(endpoint.lat, endpoint.long)
                ];
                var lineOptions: google.maps.PolylineOptions = <google.maps.PolylineOptions>{
                    path: locationlinks,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                };
                var flightPath = new MyPolyline(lineOptions);
                this.markers.last.prevNode.line = flightPath;
                this.markers.last.prevNode.line.setMap(this.myMap);
            }
        });
    }

    public GetRouteDataModel(): RouteModel {
        var routeDataModel: Array<RouteDataItemModel> = new Array<RouteDataItemModel>();
        var item = this.markers.first;
        var hasNext: boolean = true;
        do {
            routeDataModel.push(item.value.GetRouteDataItemModel());
            item = item.nextNode;
            if (item === undefined || item === null) {
                hasNext = false;
            }
        }
        while (hasNext);
        var routeModel: RouteModel = new RouteModel();
        routeModel.RouteJson = JSON.stringify(routeDataModel);
        return routeModel;
    }
}

class Link {
    public value: MyMarker;
    public prevNode: Link;
    public nextNode: Link;
    public line: MyPolyline;
}

class LinkedList {
    public first: Link;
    public last: Link;
    protected myMap;
    constructor(myMap: google.maps.Map) { }
    //list: Link;
    _length: number = 0;
    public insertLink(myMarker: MyMarker): boolean {
        if (this.first == null) {
            var node = new Link();
            node.value = myMarker;
            node.line = null;
            node.prevNode = node.nextNode = null;
            this.first = this.last = node;
            this._length++;
            return true
        } else {
            var crt = this.first;
            var node = new Link();
            node.nextNode = null;
            node.value = myMarker;
            node.line = null;
            while (crt.nextNode != null) {
                crt = crt.nextNode;
            }
            crt.nextNode = node;
            node.prevNode = crt;
            this.last = node;
            this._length++;
        }
    }

    public searchNode(marker: MyMarker): Link {
        if (this.first == null) {

            return;
        }
        else {
            var crt = this.first;
            var node;
            while (crt.nextNode != null) {
                if (crt.value == marker) {
                    node = crt;
                    break;
                }
                crt = crt.nextNode;
            }
            if (crt.value == marker) {
                node = crt;
            }
            if (node == null) {
                return node;
            }
            else {
                return crt;
            }
        }

    }


    public removeMarker(myMarker: MyMarker): boolean {
        var nodeToBeDeleted;
        if (this.first == null) {
            console.log("The list of markers is empty!");
            return true;
        }
        else {
            var crt = this.first;
            while (crt.nextNode != null) {
                if (crt.value.getPosition() == myMarker.getPosition()) {
                    nodeToBeDeleted = crt;
                    break;
                }
                crt = crt.nextNode;
            }
            if (this.last.value.getPosition() == myMarker.getPosition()) {
                nodeToBeDeleted = crt;
            }
            if ((nodeToBeDeleted == this.first) && (this.first == this.last)) {
                this.first = null;
                this.last = null;
            }
            else
                if (nodeToBeDeleted == this.first) {
                    this.first.nextNode.prevNode = null;
                    this.first = this.first.nextNode;
                }
                else if (nodeToBeDeleted == this.last) {
                    this.last.prevNode.nextNode = null;
                    this.last = this.last.prevNode;
                }
                else {
                    nodeToBeDeleted.prevNode.nextNode = nodeToBeDeleted.nextNode;
                    nodeToBeDeleted.nextNode.prevNode = nodeToBeDeleted.prevNode;
                }
        }
    }

    public printLinkList(): void {
        let crt = this.first;
        if (this.first == null) {
            console.log('empty linked list')
        } else {
            while (crt.nextNode != null) {
                console.log(crt.value);
                crt = crt.nextNode;
            }
            //to show last element
            console.log(crt.value)
        }
    }

}

class HomeModel {
    public Afisare: string;
    public Display: string;
    public Edit: string;
    public ErrorMessage: string;
    public ErrorAlert: boolean;
    public TouristAttractionList: Array<TouristAttractionModel>;
    public RouteList: Array<RouteModel>;
    public RouteListString: Array<string>;
    public RouteListString2: Array<string>;


    constructor() {
        this.TouristAttractionList = new Array<TouristAttractionModel>();
        this.RouteList = new Array<RouteModel>();
        this.RouteListString = new Array<string>();
        this.RouteListString2 = new Array<string>();
    }
}


class RouteDto {
    IdRoute: number;
    RouteJson: string;

    constructor() {
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

class RouteModel extends RouteDto {
    constructor() {
        super();
    }
    public FromRouteDto(dto: RouteDto): void {
        this.IdRoute = dto.IdRoute;
        this.RouteJson = dto.RouteJson;
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

class RouteService {
    public bonus;
    constructor($window: ng.IWindowService, $http: ng.IHttpService, Model: HomeModel) {
        var self = this;


        $http.get("/api/Route")
            .then((response) => {
                var data: Array<RouteDto> = <Array<RouteDto>>response.data;
                var resp;
                var rr;
                for (var i: number = 0; i < data.length; i++) {
                    var model: RouteModel = new RouteModel();
                    model.FromRouteDto(data[i]);
                    var routeDataModel: Array<RouteDataItemModel> = <Array<RouteDataItemModel>>JSON.parse(model.RouteJson);
                   debugger
                  
                        var lat = routeDataModel[0].Lat;
                        var lng = routeDataModel[0].Long;
                        $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true')
                            .then((r) => {
                                resp = r.data;    
                                Model.RouteListString.push(resp.results[0].formatted_address);
                            })
                            .catch((r) => {
                                console.log(r);
                            });
                        var len = routeDataModel.length;
                        len = len - 1;
                        var lat = routeDataModel[len].Lat;
                        var lng = routeDataModel[len].Long;
                        $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true')
                            .then((r) => {
                                debugger
                                resp = r.data;
                                Model.RouteListString2.push(resp.results[0].formatted_address);
                            })
                            .catch((r) => {
                                console.log(r);
                            });
                    Model.RouteList.push(model);
                }
            });


    }

    public geocodeLatLng(geocoder, map, infowindow, location): void {
        debugger
        var latlngStr = location.split(',', 2);
        var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === 'OK') {
                if (results[1]) {
                    // map.setZoom(11);
                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map
                    });
                    debugger
                    infowindow.setContent(results[1].formatted_address);
                    infowindow.open(map, marker);
                    debugger
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
}

class HomeController extends BaseController {
    public Model: HomeModel;
    protected windowService: ng.IWindowService
    protected httpService: ng.IHttpService;
    protected mapService: MapService;
    protected routeService: RouteService;
    constructor($window: ng.IWindowService, $http: ng.IHttpService) {
        super($window);
        var self = this;
        this.httpService = $http;
        this.windowService = $window;

        this.Model = new HomeModel();

        this.Model.Display = "Can't change";
        this.Model.Edit = "Do change";

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
        this.mapService = new MapService();
        this.routeService = new RouteService(this.windowService, this.httpService, this.Model);
    }

    public PostRouteClick(): void {
        debugger
        var self = this;
        var config: angular.IRequestShortcutConfig = {
            headers: {
                "dataType": "json",
                "contentType": "application/json"
            }
        };
        debugger
        var routeModel = new RouteModel();
        self.httpService.post('api/InsertRoute', this.mapService.GetRouteDataModel()).then(function (response) {
            alert("Your route has been saved successfully");
        }).catch(function (response) {
        });

    }


    protected Initialize(): void {

        setTimeout(() => {

            // this.LoadCss('<link href="https://fonts.googleapis.com/css?family=Roboto:400,700,900,900i" rel="stylesheet">');
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
