class RouteDataItemModel {
    Lat: number;
    Long: number;

    constructor(lat = 0, long = 0) {
        this.Lat = lat;
        this.Long = long;
    }
}

class RouteDataItemModelDisplay {
    LatF: number;
    LongF: number;
    From: string;
    To: string;
    LatL: number;
    LongL: number;

    constructor() {
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

    constructor(myMap: google.maps.Map, markers: LinkedList) {
        var self = this;
        var uniqueId = 1; //sus
        markers = new LinkedList(myMap);
        google.maps.event.addListener(myMap, 'click', (e) => {
            //Determine the location where the user has clicked.
            var location = e.latLng;
            //Create a marker and placed it on the map.
            var markerOptions: google.maps.MarkerOptions = <google.maps.MarkerOptions>{
                position: location,
                map: myMap
            };
            var marker = new MyMarker(markerOptions);
            //Set unique id
            marker.id = uniqueId;
            uniqueId++;
            markers.insertLink(marker);
            //Attach click event handler to the marker.
            google.maps.event.addListener(marker, "click", (e) => {
                var content = 'Latitude: ' + location.lat() + '<br />Longitude: ' + location.lng();
                content += "<br /><input type = 'button' value = 'Delete' id='removeMarkerBtn1' marker='" + marker.id + "' value = 'Delete' />";
                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });
                infoWindow.open(myMap, marker);
                setTimeout(() => {
                    $("#removeMarkerBtn1").click((e) => {
                        var myMarker = markers.searchNode(marker);
                        if ((myMarker == markers.first) && (markers.first == markers.last)) {
                            markers.removeMarker(myMarker.value);
                            myMarker.value.setMap(null);
                        }
                        else
                            if ((myMarker == markers.first) && (markers.first != markers.last)) {
                                markers.first.line.setMap(null);
                                markers.removeMarker(myMarker.value);
                                myMarker.value.setMap(null);
                            }
                            else if ((myMarker == markers.last) && (markers.last != markers.first)) {
                                markers.last.prevNode.line.setMap(null);
                                markers.removeMarker(myMarker.value);
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
                                markers.removeMarker(myMarker.value);
                                mark.value.setMap(null);
                                mark.prevNode.line = flightPath;
                                mark.prevNode.line.setMap(myMap);
                            }
                    });

                }, 300);
            });
            var node = markers.last;
            if (markers.first != markers.last) {
                var node = markers.last.prevNode;
                var startpoint = { "lat": node.value.getPosition().lat(), "long": node.value.getPosition().lng() };
                var endpoint = { "lat": markers.last.value.getPosition().lat(), "long": markers.last.value.getPosition().lng() };
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
                markers.last.prevNode.line = flightPath;
                markers.last.prevNode.line.setMap(myMap);
            }
        });
    }

    public GetRouteDataModel(markers: LinkedList): RouteModel {
        var routeDataModel: Array<RouteDataItemModel> = new Array<RouteDataItemModel>();
        var item = markers.first;
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

    public DeleteMarkers(markers: LinkedList): void {
        //TO DO
        var crt = markers.first;
        while (markers.first != null) {
            markers.first = markers.first.nextNode;
            markers.first.prevNode = null;
        }
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

class RouteList {
    public First: string;
    public Last: string;
    public Id: number;
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
    public RouteDisplayList: Array<RouteDataItemModelDisplay>;

    public Route: Array<RouteList>;
    constructor() {
        this.TouristAttractionList = new Array<TouristAttractionModel>();
        this.RouteList = new Array<RouteModel>();
        this.RouteListString = new Array<string>();
        this.RouteListString2 = new Array<string>();
        this.Route = new Array<RouteList>();
        this.RouteDisplayList = new Array<RouteDataItemModelDisplay>();
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

                this.displayRoutes(0, data, $http, Model);
            });
    }

    displayRoutes(i: number, data: Array<RouteDto>, $http: ng.IHttpService, Model: HomeModel): void {

        if (i < data.length) {
            var model: RouteModel = new RouteModel();
            model.FromRouteDto(data[i]);
            debugger
            var routeDataModel: Array<RouteDataItemModel> = <Array<RouteDataItemModel>>JSON.parse(model.RouteJson)
            var lat = routeDataModel[0].Lat
            var lng = routeDataModel[0].Long;
            $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true')
                .then((r) => {
                    var resp: any = r.data;
                    var a: RouteDataItemModelDisplay = new RouteDataItemModelDisplay();
                    a.LatF = lat; a.LongF = lng; a.From = resp.results[0].formatted_address
                    var len = routeDataModel.length;
                    len = len - 1;
                    lat = routeDataModel[len].Lat;
                    lng = routeDataModel[len].Long;
                    $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true')
                        .then((rsp) => {
                            resp = rsp.data;
                            a.LatL = lat; a.LongL = lng; a.To = resp.results[0].formatted_address
                            Model.RouteDisplayList.push(a);

                        })
                        .catch((r) => {
                            console.log(r);
                        });
                })
                .catch((r) => {
                    console.log(r);
                });

            Model.RouteList.push(model);
            this.displayRoutes(i + 1, data, $http, Model);
        }
    }

    //public geocodeLatLng(geocoder, map, infowindow, location): void {
    //    debugger
    //    var latlngStr = location.split(',', 2);
    //    var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
    //    geocoder.geocode({ 'location': latlng }, function (results, status) {
    //        if (status === 'OK') {
    //            if (results[1]) {
    //                // map.setZoom(11);
    //                var marker = new google.maps.Marker({
    //                    position: latlng,
    //                    map: map
    //                });
    //                debugger
    //                infowindow.setContent(results[1].formatted_address);
    //                infowindow.open(map, marker);
    //                debugger
    //            } else {
    //                window.alert('No results found');
    //            }
    //        } else {
    //            window.alert('Geocoder failed due to: ' + status);
    //        }
    //    });
    //}
}

class HomeController extends BaseController {
    public Model: HomeModel;
    protected windowService: ng.IWindowService
    protected httpService: ng.IHttpService;
    protected mapService: MapService;
    protected routeService: RouteService;
    protected myMap: google.maps.Map;
    protected markers: LinkedList;

    constructor($window: ng.IWindowService, $http: ng.IHttpService) {
        super($window);
        var self = this;
        this.httpService = $http;
        this.windowService = $window;
        this.Model = new HomeModel();
        var mapOptions: google.maps.MapOptions = <google.maps.MapOptions>{
            center: new google.maps.LatLng(21.0000, 78.0000),
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.myMap = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
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
        this.mapService = new MapService(this.myMap, this.markers);
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
        self.httpService.post('api/InsertRoute', this.mapService.GetRouteDataModel(this.markers)).then(function (response) {
            alert("Your route has been saved successfully");
        }).catch(function (response) {
        });

    }

    public addRoute(index: number) {
        var map = this.myMap;
        var markers = this.markers;
        debugger
        this.addRouteOnMapIndex(index, map, markers);

    }

    public addRouteOnMapIndex(index: number, myMap: google.maps.Map, markers: LinkedList): void {
        this.mapService.DeleteMarkers(markers);
        this.markers = new LinkedList(myMap);

        this.Model.RouteDisplayList[index];
        this.Model.RouteList[index];
        var model: RouteModel = new RouteModel();
        var routeJson: Array<RouteDataItemModel> = <Array<RouteDataItemModel>>JSON.parse(this.Model.RouteList[index].RouteJson);
        for (var i: number = 0; i < routeJson.length; i++) {
            var lat = routeJson[i].Lat;
            var long = routeJson[i].Long;
            var self = this;
            debugger
            var uniqueId = 1; //sus

            var location = { lat: lat, lng: long };
            //Create a marker and placed it on the map.
            var markerOptions: google.maps.MarkerOptions = <google.maps.MarkerOptions>{
                position: location,
                map: myMap
            };
            var marker = new MyMarker(markerOptions);
            //Set unique id
            marker.id = uniqueId;
            uniqueId++;
            this.markers.insertLink(marker);
            //Attach click event handler to the marker.

            google.maps.event.addListener(marker, "click", (e) => {
                var content = 'Latitude: ' + lat + '<br />Longitude: ' + long;
                content += "<br /><input type = 'button' value = 'Delete' id='removeMarkerBtn1' marker='" + marker.id + "' value = 'Delete' />";
                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });
                infoWindow.open(myMap, marker);
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
                                mark.prevNode.line.setMap(myMap);
                            }

                    });

                }, 300);
            });
            var node = this.markers.last;
            if (this.markers.first != this.markers.last) {
                debugger
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
                debugger
                this.markers.last.prevNode.line = flightPath;
                this.markers.last.prevNode.line.setMap(myMap);
            }
        }
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
