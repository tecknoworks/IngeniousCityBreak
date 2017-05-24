var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RouteDataItemModel = (function () {
    function RouteDataItemModel(lat, long) {
        this.Lat = lat;
        this.Long = long;
    }
    return RouteDataItemModel;
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
    function MapService() {
        var _this = this;
        var self = this;
        var mapOptions = {
            center: new google.maps.LatLng(21.0000, 78.0000),
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var uniqueId = 1; //sus
        this.myMap = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        this.markers = new LinkedList(this.myMap);
        google.maps.event.addListener(this.myMap, 'click', function (e) {
            //Determine the location where the user has clicked.
            var location = e.latLng;
            //Create a marker and placed it on the map.
            var markerOptions = {
                position: location,
                map: _this.myMap
            };
            var marker = new MyMarker(markerOptions);
            //Set unique id
            marker.id = uniqueId;
            uniqueId++;
            _this.markers.insertLink(marker);
            //Attach click event handler to the marker.
            var latlng = location.lat() + "," + location.lng();
            var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.lat() + ',' + location.lng() + '&sensor=true';
            google.maps.event.addListener(marker, "click", function (e) {
                var content = 'Latitude: ' + location.lat() + '<br />Longitude: ' + location.lng();
                content += "<br /><input type = 'button' value = 'Delete' id='removeMarkerBtn1' marker='" + marker.id + "' value = 'Delete' />";
                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });
                infoWindow.open(_this.myMap, marker);
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
                            _this.markers.removeMarker(myMarker.value);
                            mark.value.setMap(null);
                            mark.prevNode.line = flightPath;
                            mark.prevNode.line.setMap(_this.myMap);
                        }
                    });
                }, 300);
            });
            var node = _this.markers.last;
            if (_this.markers.first != _this.markers.last) {
                var node = _this.markers.last.prevNode;
                var startpoint = { "lat": node.value.getPosition().lat(), "long": node.value.getPosition().lng() };
                var endpoint = { "lat": _this.markers.last.value.getPosition().lat(), "long": _this.markers.last.value.getPosition().lng() };
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
                _this.markers.last.prevNode.line = flightPath;
                _this.markers.last.prevNode.line.setMap(_this.myMap);
            }
        });
    }
    MapService.prototype.GetRouteDataModel = function () {
        var routeDataModel = new Array();
        var item = this.markers.first;
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
var HomeModel = (function () {
    function HomeModel() {
        this.TouristAttractionList = new Array();
        this.RouteList = new Array();
        this.RouteListString = new Array();
        this.RouteListString2 = new Array();
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
        var self = this;
        $http.get("/api/Route")
            .then(function (response) {
            var data = response.data;
            var resp;
            var rr;
            for (var i = 0; i < data.length; i++) {
                var model = new RouteModel();
                model.FromRouteDto(data[i]);
                var routeDataModel = JSON.parse(model.RouteJson);
                debugger;
                var lat = routeDataModel[0].Lat;
                var lng = routeDataModel[0].Long;
                $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true')
                    .then(function (r) {
                    resp = r.data;
                    Model.RouteListString.push(resp.results[0].formatted_address);
                })
                    .catch(function (r) {
                    console.log(r);
                });
                var len = routeDataModel.length;
                len = len - 1;
                var lat = routeDataModel[len].Lat;
                var lng = routeDataModel[len].Long;
                $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true')
                    .then(function (r) {
                    debugger;
                    resp = r.data;
                    Model.RouteListString2.push(resp.results[0].formatted_address);
                })
                    .catch(function (r) {
                    console.log(r);
                });
                Model.RouteList.push(model);
            }
        });
    }
    RouteService.prototype.geocodeLatLng = function (geocoder, map, infowindow, location) {
        debugger;
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
                    debugger;
                    infowindow.setContent(results[1].formatted_address);
                    infowindow.open(map, marker);
                    debugger;
                }
                else {
                    window.alert('No results found');
                }
            }
            else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
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
        this.mapService = new MapService();
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
        self.httpService.post('api/InsertRoute', this.mapService.GetRouteDataModel()).then(function (response) {
            alert("Your route has been saved successfully");
        }).catch(function (response) {
        });
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
