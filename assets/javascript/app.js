var form = document.getElementById('file-form');
var fileSelect = document.getElementById('file-select');
var uploadButton = document.getElementById('upload-button');
var testImage = '<img src="assets/images/smile.png">'
// Initialize Firebase

var config = {
	apiKey: "AIzaSyDI0B16EYsHtn3zLlbKRzk5nPZvEN5_uSA",
	authDomain: "group-e135d.firebaseapp.com",
	databaseURL: "https://group-e135d.firebaseio.com",
	storageBucket: "",
};
firebase.initializeApp(config);
var dbRef = firebase.database().ref();
dbRef.set({testImage});


form.onsubmit = function(event) {
	event.preventDefault();

	// Update button text.
	uploadButton.innerHTML = 'Uploading...';

	// The rest of the code will go here...
};

// Get the selected files from the input.
var files = fileSelect.files;

// Create a new FormData object.
var formData = new FormData();

// Loop through each of the selected files.
for (var i = 0; i < files.length; i++) {
	var file = files[i];

	// Check the file type.
	if (!file.type.match('image.*')) {
		continue;
	}

	// Add the file to the request.
	formData.append('photos[]', file, file.name);
}

// // Files
// formData.append(name, file, filename);

// // Blobs
// formData.append(name, blob, filename);

// // Strings
// formData.append(name, value);
dbRef.on('value', function(snapshot) {
	$('#googleMaps').append(snapshot.val().testImage);
	console.log(snapshot.val().testImage);
}, function(error) {
	console.error(error);
});