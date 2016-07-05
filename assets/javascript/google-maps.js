var latitude;
var longitude;
var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 10,
	center: {lat: 39.876019419621166, lng: -74.3922090}//centers map on these coordinates
});

$('#get_location').on('click',function () {
    navigator.geolocation.getCurrentPosition(c);

});
var c = function(pos) {
    var lat = pos.coords.latitude,
        long = pos.coords.longitude,
        coords = lat + ',' + long;
};

var mapIcon = "assets/images/waldo.png";

$('.icon').on('click', function(){
	mapIcon = 'assets/images/' + this.id;
});



var acOptions = ['establishment', 'geocode', 'cities']; // what kind of searches the search bar makes

var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),acOptions);
autocomplete.bindTo('bounds',map);

var marker = new google.maps.Marker({ //adds an empty marker with no location (will be changed later)
	map: map,
});


google.maps.event.addListener(autocomplete, 'place_changed', function() {
	var place = autocomplete.getPlace(); //give the variable place the value that was autocompleted in the search bar
	if (place.geometry.viewport) { //probably recenter map on searched location
		map.fitBounds(place.geometry.viewport);
		console.log(place.geometry.location);
		map.setZoom(20);

	} else {
		map.setCenter(place.geometry.location);
		console.log(place.geometry.location);
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