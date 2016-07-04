
var latitude;
var longitude;
var timLatLng = {lat: 40.4259120, lng: -74.3922090}; // cooridnates of tim marker

var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 10,
	center: timLatLng //centers map on these coordinates
});

var mapIcon;

$('.icon').on('click', function(){
	mapIcon = this.src;
});


var smile = { //new marker image to be used
    url: "assets/images/smile.png", // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(15, 15) // anchor
};

var bigSmile = { //new marker image to be used
    url: "assets/images/bigSmile.png", // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(15, 15) // anchor
};

var timMarker = new google.maps.Marker({ // new marker
	position: timLatLng, //coordinates inside timLatLng
	map: map,
	icon: bigSmile, // sets marker to a new image stored inside bigSmile
	title: 'hi'
});

var acOptions = ['establishment', 'geocode', 'cities']; // what kind of searches the search bar makes

var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),acOptions);
autocomplete.bindTo('bounds',map);

var marker = new google.maps.Marker({ //adds an empty marker with no location (will be changed later)
	map: map,
});

var infoWindowOptions = { //contents of info window
	content: '<img border="0" id="img-size" src="http://s.quickmeme.com/img/c9/c9c9573e46b3fb7bd6003c62958f4e9bbe9b305801c1e14dff0ab955172c0f74.jpg"> <br>' + '<button class="btn btn-primary">hello</button>'
};
var infoWindow1 = new google.maps.InfoWindow(infoWindowOptions); //makes a new info window
google.maps.event.addListener(timMarker,'click',function(e){ //when a specific marker is clicked the info window will appear
	infoWindow1.open(map, timMarker);
});

//var infoWindow = new google.maps.InfoWindow();

google.maps.event.addListener(autocomplete, 'place_changed', function() {
	infoWindow1.close();
	var place = autocomplete.getPlace(); //give the variable place the value that was autocompleted in the search bar
	if (place.geometry.viewport) { //probably recenter map on searched location
		map.fitBounds(place.geometry.viewport);
		map.setZoom(20);

	} else {
		map.setCenter(place.geometry.location);
		map.setZoom(20);
	}

	//marker.setPosition(place.geometry.location); //sets the marker on the position that was searched for
	//infoWindow.setContent('<div><strong>' + place.name + '</strong><br>'); //sets
	// infoWindow.open(map, marker);

	// google.maps.event.addListener(marker,'click',function(e){
	// 	infoWindow.open(map, marker);
	// });
});

google.maps.event.addListener(map, 'click', function(event) { //listens for clicks on the map
	marker.setMap(null); //clears the users last marker drops on the map
	placeMarker(event.latLng); // places a marker at the coordinates of the user click
});

function placeMarker(location) { // places a marker where the user clicked
    marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: {
	        url: mapIcon,
	        scaledSize: new google.maps.Size(30, 30), // scaled size
	    	origin: new google.maps.Point(0,0), // origin
	    	anchor: new google.maps.Point(15, 15) // anchor 
    	}
    });
    latitude = marker.getPosition().lat(); // sets the value in latitude to the latitude of the current marker
    longitude = marker.getPosition().lng(); // sets the value in longitude to the latitude of the current marker
}