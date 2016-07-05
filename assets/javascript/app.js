var src = '';
var allUsers;
var allImages;

var username;
var password;

var config = {
	apiKey: "AIzaSyDI0B16EYsHtn3zLlbKRzk5nPZvEN5_uSA",
	authDomain: "group-e135d.firebaseapp.com",
	databaseURL: "https://group-e135d.firebaseio.com",
	storageBucket: "",
};

firebase.initializeApp(config);
var dbRef = firebase.database().ref();


dbRef.child('src').set({src});


//GETS IMAGE FROM LOCAL FILES
function imgSelector(){
	document.getElementById('imgLoader').onchange = function handleImage(e) {// gives the img data as a base64 encoded string.
		var reader = new FileReader();
		reader.onload = function (event) {
			src = event.target.result;
			dbRef.child('src').set({src});
		}
		reader.readAsDataURL(e.target.files[0]);
	};
};

dbRef.on('value', function(snapshot) {
	allUsers = snapshot.val().users;
	for (var i = 0; i < allUsers.length; i++) {
		if (allUsers[i] === undefined) { // removes all undefined/missing users
			allUsers.splice(i,1);
			i--;
		}
	}
	allImages = snapshot.val().images;
	for (var i = 0; i < allImages.length; i++) {
		if (allImages[i] === undefined) { // removes all undefined/missing entries
			allImages.splice(i,1);
			i--;
		}
	}
		var imageSrc = snapshot.val().src.src; //gets the img data as a base64 encoded string stored on server
		var image = $('<img>', {
			src: imageSrc
		});
	

	for (var i = 1; i < allImages.length; i++) {
		
		var marker = { //new marker image to be used
		    url: allImages[i].markerSrc, // url
		    scaledSize: new google.maps.Size(30, 30), // scaled size
		    origin: new google.maps.Point(0,0), // origin
		    anchor: new google.maps.Point(15, 15) // anchor
		};

		var newMarker = new google.maps.Marker({ // new marker
			position: allImages[i].position, //coordinates inside timLatLng
			map: map,
			icon: marker, // sets marker to a new image stored inside bigSmile
			title: 'hi',
			attr: i
		});

		google.maps.event.addListener(newMarker,'click',function(e){ //when a specific marker is clicked the info window will appear
			var infoWindowOptions = { //contents of info window
				content:'<img border="0" id="img-size" src="'+allImages[this.attr].source+'"><br><div id="relevant">Still Relevant</div><div id="relevant">Nah</div>'
			};
			var infoWindow1 = new google.maps.InfoWindow(infoWindowOptions);
			infoWindow1.open(map, this);
		});
	};
}, function(error) {
	console.error(error);
});


//SUBMIT BUTTON FOR IMAGES
$('#imgUploaderBtn').on('click', '#imageBtn', function () {
	if (src && latitude) { //if there is a value in the source/ if there is an image already selected
		var imageObj = {
			username: username,
			source: src,
			markerSrc: mapIcon,
			position: {lat: latitude, lng: longitude}
		};
		allImages.push(imageObj);
		dbRef.child('images').set(allImages);
	} else if (!src && !latitude){
		alert('Please select an image and a location on the map.')
	} else if (src && !latitude){
		alert('Please select a location on the map.')
	} else if (!src && latitude){
		alert('Please select an image.')
	};

});


// OWL CAROUSEL
$(document).ready(function() {
 	$("#owl-demo").owlCarousel({
		autoPlay: false, //Set AutoPlay to x000 seconds
		items : 6, //Number of items visable at a time
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,3]
	});
});