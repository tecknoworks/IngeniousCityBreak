var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RouteDataItemModel = (function () {
    function RouteDataItemModel(lat, long) {
        if (lat === void 0) { lat = 0; }
        if (long === void 0) { long = 0; }
        this.Lat = lat;
        this.Long = long;
    }
    return RouteDataItemModel;
}());
var RouteDataItemModelDisplay = (function () {
    function RouteDataItemModelDisplay() {
    }
    return RouteDataItemModelDisplay;
}());
var MyMarker = (function (_super) {
    __extends(MyMarker, _super);
    function MyMarker(opts) {
        _super.call(this, opts);
    }
    MyMarker.prototype.GetRouteDataItemModel = function () {
        return new RouteDataItemModel(this.getPosition().lat(), this.getPosition().lng());
    };
    return MyMarker;
}(google.maps.Marker));
var MyPolyline = (function (_super) {
    __extends(MyPolyline, _super);
    function MyPolyline(opts) {
        _super.call(this, opts);
    }
    return MyPolyline;
}(google.maps.Polyline));
var MapService = (function () {
    function MapService(myMap, markers) {
        var self = this;
        var uniqueId = 1; //sus
        markers = new LinkedList(myMap);
        google.maps.event.addListener(myMap, 'click', function (e) {
            //Determine the location where the user has clicked.
            var location = e.latLng;
            //Create a marker and placed it on the map.
            var markerOptions = {
                position: location,
                map: myMap
            };
            var marker = new MyMarker(markerOptions);
            //Set unique id
            marker.id = uniqueId;
            uniqueId++;
            markers.insertLink(marker);
            //Attach click event handler to the marker.
            google.maps.event.addListener(marker, "click", function (e) {
                var content = 'Latitude: ' + location.lat() + '<br />Longitude: ' + location.lng();
                content += "<br /><input type = 'button' value = 'Delete' id='removeMarkerBtn1' marker='" + marker.id + "' value = 'Delete' />";
                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });
                infoWindow.open(myMap, marker);
                setTimeout(function () {
                    $("#removeMarkerBtn1").click(function (e) {
                        var myMarker = markers.searchNode(marker);
                        if ((myMarker == markers.first) && (markers.first == markers.last)) {
                            markers.removeMarker(myMarker.value);
                            myMarker.value.setMap(null);
                        }
                        else if ((myMarker == markers.first) && (markers.first != markers.last)) {
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
                            debugger;
                            var lineOptions = {
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
                var lineOptions = {
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
    MapService.prototype.GetRouteDataModel = function (markers) {
        var routeDataModel = new Array();
        var item = markers.first;
        var hasNext = true;
        do {
            routeDataModel.push(item.value.GetRouteDataItemModel());
            item = item.nextNode;
            if (item === undefined || item === null) {
                hasNext = false;
            }
        } while (hasNext);
        var routeModel = new RouteModel();
        routeModel.RouteJson = JSON.stringify(routeDataModel);
        return routeModel;
    };
    MapService.prototype.DeleteMarkers = function (markers) {
        //TO DO
        var crt = markers.first;
        while (markers.first != null) {
            markers.first = markers.first.nextNode;
            markers.first.prevNode = null;
        }
    };
    return MapService;
}());
var Link = (function () {
    function Link() {
    }
    return Link;
}());
var LinkedList = (function () {
    function LinkedList(myMap) {
        //list: Link;
        this._length = 0;
    }
    LinkedList.prototype.insertLink = function (myMarker) {
        if (this.first == null) {
            var node = new Link();
            node.value = myMarker;
            node.line = null;
            node.prevNode = node.nextNode = null;
            this.first = this.last = node;
            this._length++;
            return true;
        }
        else {
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
    };
    LinkedList.prototype.searchNode = function (marker) {
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
    };
    LinkedList.prototype.removeMarker = function (myMarker) {
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
            else if (nodeToBeDeleted == this.first) {
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
    };
    LinkedList.prototype.printLinkList = function () {
        var crt = this.first;
        if (this.first == null) {
            console.log('empty linked list');
        }
        else {
            while (crt.nextNode != null) {
                console.log(crt.value);
                crt = crt.nextNode;
            }
            //to show last element
            console.log(crt.value);
        }
    };
    return LinkedList;
}());
var RouteList = (function () {
    function RouteList() {
    }
    return RouteList;
}());
var HomeModel = (function () {
    function HomeModel() {
        this.TouristAttractionList = new Array();
        this.RouteList = new Array();
        this.RouteListString = new Array();
        this.RouteListString2 = new Array();
        this.Route = new Array();
        this.RouteDisplayList = new Array();
    }
    return HomeModel;
}());
var RouteDto = (function () {
    function RouteDto() {
    }
    return RouteDto;
}());
var TouristAttractionDto = (function () {
    function TouristAttractionDto() {
    }
    return TouristAttractionDto;
}());
var RouteModel = (function (_super) {
    __extends(RouteModel, _super);
    function RouteModel() {
        _super.call(this);
    }
    RouteModel.prototype.FromRouteDto = function (dto) {
        this.IdRoute = dto.IdRoute;
        this.RouteJson = dto.RouteJson;
    };
    return RouteModel;
}(RouteDto));
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
var RouteService = (function () {
    function RouteService($window, $http, Model) {
        var _this = this;
        var self = this;
        $http.get("/api/Route")
            .then(function (response) {
            var data = response.data;
            var resp;
            var rr;
            _this.displayRoutes(0, data, $http, Model);
        });
    }
    RouteService.prototype.displayRoutes = function (i, data, $http, Model) {
        if (i < data.length) {
            var model = new RouteModel();
            model.FromRouteDto(data[i]);
            debugger;
            var routeDataModel = JSON.parse(model.RouteJson);
            var lat = routeDataModel[0].Lat;
            var lng = routeDataModel[0].Long;
            $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true')
                .then(function (r) {
                var resp = r.data;
                var a = new RouteDataItemModelDisplay();
                a.LatF = lat;
                a.LongF = lng;
                a.From = resp.results[0].formatted_address;
                var len = routeDataModel.length;
                len = len - 1;
                lat = routeDataModel[len].Lat;
                lng = routeDataModel[len].Long;
                $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true')
                    .then(function (rsp) {
                    resp = rsp.data;
                    a.LatL = lat;
                    a.LongL = lng;
                    a.To = resp.results[0].formatted_address;
                    Model.RouteDisplayList.push(a);
                })
                    .catch(function (r) {
                    console.log(r);
                });
            })
                .catch(function (r) {
                console.log(r);
            });
            Model.RouteList.push(model);
            this.displayRoutes(i + 1, data, $http, Model);
        }
    };
    return RouteService;
}());
var HomeController = (function (_super) {
    __extends(HomeController, _super);
    function HomeController($window, $http) {
        _super.call(this, $window);
        var self = this;
        this.httpService = $http;
        this.windowService = $window;
        this.Model = new HomeModel();
        var mapOptions = {
            center: new google.maps.LatLng(21.0000, 78.0000),
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.myMap = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        this.Model.Display = "Can't change";
        this.Model.Edit = "Do change";
        this.httpService.get("/api/TouristAttraction")
            .then(function (response) {
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
                var model = new TouristAttractionModel();
                model.FromDto(data[i]);
                self.Model.TouristAttractionList.push(model);
            }
        });
        this.Initialize();
        this.mapService = new MapService(this.myMap, this.markers);
        this.routeService = new RouteService(this.windowService, this.httpService, this.Model);
    }
    HomeController.prototype.PostRouteClick = function () {
        debugger;
        var self = this;
        var config = {
            headers: {
                "dataType": "json",
                "contentType": "application/json"
            }
        };
        debugger;
        var routeModel = new RouteModel();
        self.httpService.post('api/InsertRoute', this.mapService.GetRouteDataModel(this.markers)).then(function (response) {
            alert("Your route has been saved successfully");
        }).catch(function (response) {
        });
    };
    HomeController.prototype.addRoute = function (index) {
        var map = this.myMap;
        var markers = this.markers;
        debugger;
        this.addRouteOnMapIndex(index, map, markers);
    };
    HomeController.prototype.addRouteOnMapIndex = function (index, myMap, markers) {
        var _this = this;
        this.mapService.DeleteMarkers(markers);
        this.markers = new LinkedList(myMap);
        this.Model.RouteDisplayList[index];
        this.Model.RouteList[index];
        var model = new RouteModel();
        var routeJson = JSON.parse(this.Model.RouteList[index].RouteJson);
        for (var i = 0; i < routeJson.length; i++) {
            var lat = routeJson[i].Lat;
            var long = routeJson[i].Long;
            var self = this;
            debugger;
            var uniqueId = 1; //sus
            var location = { lat: lat, lng: long };
            //Create a marker and placed it on the map.
            var markerOptions = {
                position: location,
                map: myMap
            };
            var marker = new MyMarker(markerOptions);
            //Set unique id
            marker.id = uniqueId;
            uniqueId++;
            this.markers.insertLink(marker);
            //Attach click event handler to the marker.
            google.maps.event.addListener(marker, "click", function (e) {
                var content = 'Latitude: ' + lat + '<br />Longitude: ' + long;
                content += "<br /><input type = 'button' value = 'Delete' id='removeMarkerBtn1' marker='" + marker.id + "' value = 'Delete' />";
                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });
                infoWindow.open(myMap, marker);
                setTimeout(function () {
                    $("#removeMarkerBtn1").click(function (e) {
                        var myMarker = _this.markers.searchNode(marker);
                        if ((myMarker == _this.markers.first) && (_this.markers.first == _this.markers.last)) {
                            _this.markers.removeMarker(myMarker.value);
                            myMarker.value.setMap(null);
                        }
                        else if ((myMarker == _this.markers.first) && (_this.markers.first != _this.markers.last)) {
                            _this.markers.first.line.setMap(null);
                            _this.markers.removeMarker(myMarker.value);
                            myMarker.value.setMap(null);
                        }
                        else if ((myMarker == _this.markers.last) && (_this.markers.last != _this.markers.first)) {
                            _this.markers.last.prevNode.line.setMap(null);
                            _this.markers.removeMarker(myMarker.value);
                            myMarker.value.setMap(null);
                        }
                        else {
                            var startpoint = { "lat": myMarker.prevNode.value.getPosition().lat(), "long": myMarker.prevNode.value.getPosition().lng() };
                            var endpoint = { "lat": myMarker.nextNode.value.getPosition().lat(), "long": myMarker.nextNode.value.getPosition().lng() };
                            var locationlinks = [
                                new google.maps.LatLng(startpoint.lat, startpoint.long),
                                new google.maps.LatLng(endpoint.lat, endpoint.long)
                            ];
                            var lineOptions = {
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
                            _this.markers.removeMarker(myMarker.value);
                            mark.value.setMap(null);
                            mark.prevNode.line = flightPath;
                            mark.prevNode.line.setMap(myMap);
                        }
                    });
                }, 300);
            });
            var node = this.markers.last;
            if (this.markers.first != this.markers.last) {
                debugger;
                var node = this.markers.last.prevNode;
                var startpoint = { "lat": node.value.getPosition().lat(), "long": node.value.getPosition().lng() };
                var endpoint = { "lat": this.markers.last.value.getPosition().lat(), "long": this.markers.last.value.getPosition().lng() };
                var locationlinks = [
                    new google.maps.LatLng(startpoint.lat, startpoint.long),
                    new google.maps.LatLng(endpoint.lat, endpoint.long)
                ];
                var lineOptions = {
                    path: locationlinks,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                };
                var flightPath = new MyPolyline(lineOptions);
                debugger;
                this.markers.last.prevNode.line = flightPath;
                this.markers.last.prevNode.line.setMap(myMap);
            }
        }
    };
    HomeController.prototype.Initialize = function () {
        var _this = this;
        setTimeout(function () {
            // this.LoadCss('<link href="https://fonts.googleapis.com/css?family=Roboto:400,700,900,900i" rel="stylesheet">');
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
}(BaseController));
