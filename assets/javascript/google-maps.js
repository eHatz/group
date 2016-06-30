
var latitude;
var longitude;
var timLatLng = {lat: 40.4259120, lng: -74.3922090}; // cooridnates of marker

var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 10,
	center: timLatLng //centers map on these coordinates
});

var timMarker = new google.maps.Marker({ // new marker
	position: timLatLng, //coordinates inside timLatLng
	map: map,
	title: 'hi'
});

var acOptions = ['establishment', 'geocode', 'cities'];

var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),acOptions);
autocomplete.bindTo('bounds',map);

var marker = new google.maps.Marker({ //adds a marker 
	map: map,
});
var button = $('<button>', {
	text: 'hello'
});
var infoWindowOptions = { //contents of info window
	content: '<img border="0" id="img-size" src="http://s.quickmeme.com/img/c9/c9c9573e46b3fb7bd6003c62958f4e9bbe9b305801c1e14dff0ab955172c0f74.jpg"> <br>' + '<button class="btn btn-primary">hello</button>'
};
var infoWindow1 = new google.maps.InfoWindow(infoWindowOptions); //makes a new info window
google.maps.event.addListener(timMarker,'click',function(e){ //when a specific marker is clicked the info window will appear

	infoWindow1.open(map, timMarker);
});
var infoWindow = new google.maps.InfoWindow();

google.maps.event.addListener(autocomplete, 'place_changed', function() {
	infoWindow1.close();
	var place = autocomplete.getPlace();

	if (place.geometry.viewport) {
		map.fitBounds(place.geometry.viewport);
		map.setZoom(17);

	} else {
		map.setCenter(place.geometry.location);
		map.setZoom(17);
	}

	marker.setPosition(place.geometry.location);
	infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
	infoWindow.open(map, marker);

	google.maps.event.addListener(marker,'click',function(e){
		infoWindow.open(map, marker);
	});
});
var marker = new google.maps.Marker({
        map: map
});
google.maps.event.addListener(map, 'click', function(event) {
	marker.setMap(null);
	placeMarker(event.latLng);
});

function placeMarker(location) {
    marker = new google.maps.Marker({
        position: location, 
        map: map
    });
    latitude = marker.getPosition().lat();
    longitude = marker.getPosition().lng();
}