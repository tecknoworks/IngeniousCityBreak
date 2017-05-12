var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyMarker = (function (_super) {
    __extends(MyMarker, _super);
    function MyMarker(opts) {
        _super.call(this, opts);
    }
    return MyMarker;
}(google.maps.Marker));
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
        debugger;
        this.myMap = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        var markers = new LinkedList(this.myMap);
        google.maps.event.addListener(this.myMap, 'click', function (e) {
            //Determine the location where the user has clicked.
            var location = e.latLng;
            //Create a marker and placed it on the map.
            var markerOptions = {
                position: location,
                map: _this.myMap
            };
            debugger;
            var marker = new MyMarker(markerOptions);
            //Set unique id
            marker.id = uniqueId;
            uniqueId++;
            markers.insertLink(marker);
            //Attach click event handler to the marker.
            google.maps.event.addListener(marker, "click", function (e) {
                var content = 'Latitude: ' + location.lat() + '<br />Longitude: ' + location.lng();
                content += "<br /><input type = 'button' value = 'Delete' id='removeMarkerBtn1' marker='" + marker.id + "' value = 'Delete' />";
                debugger;
                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });
                debugger;
                infoWindow.open(_this.myMap, marker);
                setTimeout(function () {
                    $("#removeMarkerBtn1").click(function (e) {
                        debugger;
                        var myMarker = markers.searchNode(marker);
                        if (myMarker == markers.first) {
                            var startpoint = { "lat": myMarker.value.getPosition().lat(), "long": myMarker.value.getPosition().lng() };
                            var endpoint = { "lat": myMarker.nextNode.value.getPosition().lat(), "long": myMarker.nextNode.value.getPosition().lng() };
                            debugger;
                            markers.removeMarker(myMarker.value);
                            debugger;
                            marker.setMap(null);
                        }
                        //else if (myMarker == markers.last) {
                        //    var startpoint = { "lat": myMarker.prevNode.value.getPosition().lat(), "long": myMarker.prevNode.value.getPosition().lng() };
                        //    var endpoint1 = { "lat": myMarker.value.getPosition().lat(), "long": myMarker.value.getPosition().lng() };
                        //    markers.removeMarker(myMarker.value);
                        //    marker.setMap(null);
                        //}
                        //var startpoint = { "lat": myMarker.value.getPosition().lat(), "long": myMarker.value.getPosition().lng() };
                        //var endpoint1 = { "lat": myMarker.prevNode.value.getPosition().lat(), "long": myMarker.prevNode.value.getPosition().lng() };
                        //var endpoint2 = { "lat": myMarker.nextNode.value.getPosition().lat(), "long": myMarker.nextNode.value.getPosition().lng() };
                        //var locationlinks1 = [
                        //    new google.maps.LatLng(startpoint.lat, startpoint.long),
                        //    new google.maps.LatLng(endpoint1.lat, endpoint1.long)
                        //];
                        //debugger
                        ////flightPath.setMap(null);
                        //var locationlinks2 = [
                        //    new google.maps.LatLng(startpoint.lat, startpoint.long),
                        //    new google.maps.LatLng(endpoint2.lat, endpoint2.long)
                        //];
                        //  flightPath.setMap(null);
                        markers.removeMarker(marker);
                        marker.setMap(null);
                    });
                }, 300);
            });
            debugger;
            var node = markers.last;
            if (markers.first != markers.last) {
                var node = markers.last.prevNode;
                var startpoint = { "lat": node.value.getPosition().lat(), "long": node.value.getPosition().lng() };
                var endpoint = { "lat": markers.last.value.getPosition().lat(), "long": markers.last.value.getPosition().lng() };
                var locationlinks = [
                    new google.maps.LatLng(startpoint.lat, startpoint.long),
                    new google.maps.LatLng(endpoint.lat, endpoint.long)
                ];
                debugger;
                var flightPath = new google.maps.Polyline({
                    path: locationlinks,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
                debugger;
                flightPath.setMap(_this.myMap);
            }
        });
    }
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
            return node;
        }
    };
    LinkedList.prototype.removeMarker = function (myMarker) {
        if (this.first == null) {
            console.log("The list of markers is empty!");
            return true;
        }
        else {
            var crt = this.first;
            while (crt.nextNode != null) {
                if (crt.value.getPosition() == myMarker.getPosition()) {
                    var nodeToBeDeleted = crt;
                    break;
                }
                crt = crt.nextNode;
            }
            if (this.last.value.getPosition() == myMarker.getPosition()) {
                var nodeToBeDeleted = crt;
            }
            if ((nodeToBeDeleted == this.first) && (nodeToBeDeleted == this.last)) {
                this.first = null;
                this.last = null;
            }
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
    //last occurrence of a given number
    LinkedList.prototype.searchNodeByValue = function (myMarker) {
        var temp = this.first;
        var counter = 1;
        var position = null;
        if (temp == null) {
            console.log('empty list');
        }
        else {
            while (temp.nextNode != null) {
                if (temp.value === myMarker) {
                    position = counter;
                    break;
                }
                counter++;
                temp = temp.nextNode;
            }
            //check if the  last element of the node
            if (temp.value === myMarker) {
                position = counter;
            }
        }
        //console.log(position);
        if (position == null) {
            return 0;
        }
        else {
            return position;
        }
    };
    LinkedList.prototype.removeListItemByValue = function (myMarker) {
        if (this.first == null) {
            return true;
        }
        else {
            var itemPosition = this.searchNodeByValue(myMarker);
            if (itemPosition == 0) {
                return true;
            }
            else {
                var temp = this.first;
                //if its the first element in the stack
                if (itemPosition == 1) {
                    this.first = this.first.nextNode;
                    this.first.prevNode = null;
                    return true;
                }
                //if the element is not first or last
                while (temp.nextNode.value != myMarker) {
                    console.log('in here');
                    temp = temp.nextNode;
                }
                temp.nextNode.prevNode = temp.prevNode;
                temp.prevNode.nextNode = temp.nextNode;
            }
            return true;
        }
    };
    LinkedList.prototype.toString = function () {
        var current = this.first;
        var str = '';
        while (current) {
            str += current.value; //output is undefinedundefinedundefined
            // str += JSON.stringify(current);
            // prints out {"next":{"next":{}}}{"next":{}}{}
            current = current.nextNode;
        }
        return str;
    };
    return LinkedList;
}());
var HomeModel = (function () {
    function HomeModel() {
        this.TouristAttractionList = new Array();
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
    function HomeController($window, $http) {
        var self = this;
        this.httpService = $http;
        this.windowService = $window;
        this.Model = new HomeModel();
        //this.Model.Display = "Can't change";
        //this.Model.Edit = "Do change";
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
    }
    HomeController.prototype.Initialize = function () {
        var _this = this;
        setTimeout(function () {
            _this.LoadCss('<link href="https://fonts.googleapis.com/css?family=Roboto:400,700,900,900i" rel="stylesheet">');
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
}());
//# sourceMappingURL=home.controller.js.map