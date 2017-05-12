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
var MapModel = (function () {
    function MapModel() {
        this.MarkersList = new Array();
    }
    return MapModel;
}());
var MarkersDto = (function () {
    function MarkersDto() {
    }
    return MarkersDto;
}());
var MarkersModel = (function (_super) {
    __extends(MarkersModel, _super);
    function MarkersModel() {
        _super.call(this);
    }
    MarkersModel.prototype.FromDto = function (dto) {
        this.IdMarker = dto.IdMarker;
        this.Latitude = dto.Latitude;
        this.Longitude = dto.Longitude;
    };
    return MarkersModel;
}(MarkersDto));
var MapService = (function () {
    function MapService($window, $http) {
        var _this = this;
        var self = this;
        this.httpService = $http;
        this.windowService = $window;
        this.Model.Display = "Displayy";
        this.Model = new MapModel();
        var mapOptions = {
            center: new google.maps.LatLng(21.0000, 78.0000),
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var uniqueId = 1; //sus
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
            var marker = new MyMarker(markerOptions);
            //Set unique id
            marker.id = uniqueId;
            uniqueId++;
            //Attach click event handler to the marker.
            google.maps.event.addListener(marker, "click", function (e) {
                var content = 'Latitude: ' + location.lat() + '<br />Longitude: ' + location.lng();
                content += "<br /><input type = 'button' value = 'Delete' onclick = 'DeleteMarker(" + marker.id + ");' value = 'Delete' />";
                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });
                infoWindow.open(_this.myMap, marker);
            });
        });
        var crt = markers.list;
        var flightPath;
        while (crt.nextNode != null) {
            var startpoint = { "lat": crt.value.getPosition().lat(), "long": crt.value.getPosition().lng() };
            var endpoint = { "lat": crt.nextNode.value.getPosition().lat(), "long": crt.nextNode.value.getPosition().lng() };
            var locationlinks = [
                new google.maps.LatLng(startpoint.lat, startpoint.long),
                new google.maps.LatLng(endpoint.lat, endpoint.long)
            ];
            debugger;
            flightPath = new google.maps.Polyline({
                path: locationlinks,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            debugger;
            flightPath.setMap(this.myMap);
        }
    }
    MapService.prototype.Write = function () {
        debugger;
        this.Model.Display = "Hello! ";
    };
    return MapService;
}());
var Link = (function () {
    function Link(nodeValue, nextNodeReference, prevNodeReference) {
        this.value = nodeValue;
        this.nextNode = nextNodeReference;
        this.prevNode = prevNodeReference;
    }
    return Link;
}());
var LinkedList = (function () {
    function LinkedList(myMap) {
        this._length = 0;
    }
    LinkedList.prototype.insertLink = function (myMaker) {
        if (this.list == null) {
            this.list = new Link(myMaker, null, null);
            this._length++;
            return true;
        }
        else {
            var temp = this.list;
            while (temp.nextNode != null) {
                temp = temp.nextNode;
            }
            temp.nextNode = new Link(myMaker, null, temp);
            this._length++;
            return false;
        }
    };
    LinkedList.prototype.printLinkList = function () {
        var temp = this.list;
        if (this.list == null) {
            console.log('empty linked list');
        }
        else {
            while (temp.nextNode != null) {
                console.log(temp.value);
                temp = temp.nextNode;
            }
            //to show last element
            console.log(temp.value);
        }
    };
    //last occurrence of a given number
    LinkedList.prototype.searchNodeByValue = function (myMarker) {
        var temp = this.list;
        var counter = 1;
        var position = null;
        if (temp == null) {
            console.log('empty list');
        }
        else {
            while (temp.nextNode != null) {
                if (temp.value === myMarker) {
                    position = counter;
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
        if (this.list == null) {
            return true;
        }
        else {
            var itemPosition = this.searchNodeByValue(myMarker);
            if (itemPosition == 0) {
                return true;
            }
            else {
                var temp = this.list;
                //if its the first element in the stack
                if (itemPosition == 1) {
                    this.list = this.list.nextNode;
                    this.list.prevNode = null;
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
        var current = this.list;
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
//let obj = new LinkedList();
//obj.insertLink(1);
//obj.insertLink(2);
//obj.insertLink(3);
//obj.insertLink(4);
//obj.removeListItemByPos(4);
//obj.insertLink(5);
//console.log(obj.toString()) 
