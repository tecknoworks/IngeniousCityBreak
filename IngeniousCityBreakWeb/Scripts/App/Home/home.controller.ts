class MyMarker extends google.maps.Marker {
    id: number;
    constructor(opts?: google.maps.MarkerOptions) {
        super(opts);
    }
}

class MapService{
    protected myMap: google.maps.Map;
        constructor() {
        var self = this;

        var mapOptions: google.maps.MapOptions = <google.maps.MapOptions>{
            center: new google.maps.LatLng(21.0000, 78.0000),
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
       
        var uniqueId = 1; //sus
        debugger
        this.myMap = new google.maps.Map(document.getElementById("dvMap"), mapOptions); 
        let markers = new LinkedList(this.myMap); 

        google.maps.event.addListener(this.myMap, 'click', (e) => {
            //Determine the location where the user has clicked.
            var location = e.latLng;

            //Create a marker and placed it on the map.
            var markerOptions: google.maps.MarkerOptions = <google.maps.MarkerOptions>{
                position: location,
                map: this.myMap
            };
            debugger
            var marker = new MyMarker(markerOptions);
            //Set unique id
            marker.id = uniqueId;
            uniqueId++;
            markers.insertLink(marker);
            //Attach click event handler to the marker.
         
            google.maps.event.addListener(marker, "click", (e) => {
                var content = 'Latitude: ' + location.lat() + '<br />Longitude: ' + location.lng();
                content += "<br /><input type = 'button' value = 'Delete' id='removeMarkerBtn1' marker='" + marker.id + "' value = 'Delete' />";
                debugger
                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });
                debugger
                infoWindow.open(this.myMap, marker);
                setTimeout(() => {
                    $("#removeMarkerBtn1").click((e) => {
                        debugger
                        marker.setMap(null);
                        var myMarker = markers.searchNode(marker);
                        var startpoint = { "lat": myMarker.value.getPosition().lat(), "long": myMarker.value.getPosition().lng() };
                        var endpoint = { "lat": myMarker.prevNode.value.getPosition().lat(), "long": myMarker.prevNode.value.getPosition().lng() };
                        var locationlinks = [
                            new google.maps.LatLng(startpoint.lat, startpoint.long),
                            new google.maps.LatLng(endpoint.lat, endpoint.long)
                        ];
                        var flightPath;
                        debugger
                        flightPath = new google.maps.Polyline({
                            path: locationlinks,
                            geodesic: true,
                            strokeColor: '#FF0000',
                            strokeOpacity: 1.0,
                            strokeWeight: 2
                        });
                        debugger
                        flightPath.setMap(null);
                        markers.removeMarker(marker);
                    });
                }, 300);
            });
            debugger
            var node = markers.last;
            if (markers.first != markers.last) {
                var node = markers.last.prevNode;
                var startpoint = { "lat": node.value.getPosition().lat(), "long": node.value.getPosition().lng() };
                var endpoint = { "lat": markers.last.value.getPosition().lat(), "long": markers.last.value.getPosition().lng() };
                var locationlinks = [
                    new google.maps.LatLng(startpoint.lat, startpoint.long),
                    new google.maps.LatLng(endpoint.lat, endpoint.long)
                ];
                var flightPath;
                debugger
                flightPath = new google.maps.Polyline({
                    path: locationlinks,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
                debugger
                flightPath
                flightPath.setMap(this.myMap);
            }
        });
    }
}

 class Link {
    public value: MyMarker;
    public prevNode: Link;
    public nextNode : Link

    //constructor(nodeValue: MyMarker, prevNodeReference, nextNodeReference ) {
    //    this.value = nodeValue;
    //    this.nextNode = nextNodeReference;
    //    this.prevNode = prevNodeReference;
    //}
}



 class LinkedList{
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
            node.prevNode = node.nextNode = null;
            this.first = this.last = node;
            this._length++;
            return true
        } else {
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
    }

    public searchNode(marker: MyMarker): Link {
        if (this.first == null) {
            alert("The marker's list is empty");
            return;
        }
        else {
            var crt = this.first;
            while (crt.nextNode != null) {
                if (crt.value == marker) {
                    var node = crt;
                    break;
                }
                crt = crt.nextNode;
            }
            return node;
        }
       
    }

    //public getIndex(): number {
    //    if (this.first != null) {
    //        var crt = this.first;
    //        var index = 1;
    //        while (crt.nextNode != null) {
    //            return index++;
    //            crt = crt.nextNode;
    //        }
    //    }
    //}

    public removeMarker(myMarker: MyMarker): boolean {
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
            if (nodeToBeDeleted == this.first) {
                this.first.nextNode.prevNode = null;
                this.first = this.first.nextNode;
            }
            else if (nodeToBeDeleted == this.last) {
                this.last.prevNode.nextNode = null;
                this.last = this.last.prevNode;
            }
            else
            {
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

    //last occurrence of a given number
    public searchNodeByValue(myMarker: MyMarker): number {
        let temp = this.first;
        let counter = 1;
        let position = null;
        if (temp == null) {
            console.log('empty list');
        } else {
            while (temp.nextNode != null) {
                if (temp.value === myMarker) {
                    position = counter;
                    break;
                }
                counter++;
                temp = temp.nextNode
            }
            //check if the  last element of the node
            if (temp.value === myMarker) {
                position = counter;
            }
        }
        //console.log(position);
        if (position == null) {
            return 0;
        } else {
            return position;
        }
    }

    public removeListItemByValue(myMarker: MyMarker): boolean {
        if (this.first == null) {
            return true
        } else {
            let itemPosition = this.searchNodeByValue(myMarker);
            if (itemPosition == 0) {
                return true
            } else {
                let temp = this.first;

                //if its the first element in the stack
                if (itemPosition == 1) {
                    this.first = this.first.nextNode;
                    this.first.prevNode = null;
                    return true
                }
                //if the element is not first or last
                while (temp.nextNode.value != myMarker) {
                    console.log('in here');
                    temp = temp.nextNode;
                }
                temp.nextNode.prevNode = temp.prevNode;
                temp.prevNode.nextNode = temp.nextNode;
            }
            return true
        }
    }

    public toString(): String {
        let current = this.first;
        let str = '';
        while (current) {
            str += current.value; //output is undefinedundefinedundefined
            // str += JSON.stringify(current);
            // prints out {"next":{"next":{}}}{"next":{}}{}
            current = current.nextNode;
        }
        return str;
    }
}




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
    protected mapService: MapService;
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
        this.mapService = new MapService();
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
