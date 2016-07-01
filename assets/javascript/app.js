// var form = document.getElementById('file-form');
// var fileSelect = document.getElementById('file-select');
// var uploadButton = document.getElementById('upload-button');
// var testImage = '<img src="assets/images/smile.png">'
// // Initialize Firebase

// var config = {
// 	apiKey: "AIzaSyDI0B16EYsHtn3zLlbKRzk5nPZvEN5_uSA",
// 	authDomain: "group-e135d.firebaseapp.com",
// 	databaseURL: "https://group-e135d.firebaseio.com",
// 	storageBucket: "",
// };
// firebase.initializeApp(config);
// var dbRef = firebase.database().ref();
// dbRef.set({testImage});


// form.onsubmit = function(event) {
// 	event.preventDefault();

// 	// Update button text.
// 	uploadButton.innerHTML = 'Uploading...';

// 	// The rest of the code will go here...
// };

// // Get the selected files from the input.
// var files = fileSelect.files;

// // Create a new FormData object.
// var formData = new FormData();

// // Loop through each of the selected files.


// // // Files
// // formData.append(name, file, filename);

// // // Blobs
// // formData.append(name, blob, filename);

// // // Strings
// // formData.append(name, value);
// dbRef.on('value', function(snapshot) {
// 	$('#googleMaps').append(snapshot.val().testImage);
// 	console.log(snapshot.val().testImage);
// }, function(error) {
// 	console.error(error);
// });

document.getElementById('imgLoader').onchange = function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) { console.log('fdsf');
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
            // start fabricJS stuff
            

        $('#googleMaps').append(imgObj);
            var image = new fabric.Image(imgObj);
            image.set({
                left: 250,
                top: 250,
                angle: 20,
                padding: 10,
                cornersize: 10
            });
            //image.scale(getRandomNum(0.1, 0.25)).setCoords();
            canvas.add(image);
            
            // end fabricJS stuff
        }
        
    }
    reader.readAsDataURL(e.target.files[0]);
}