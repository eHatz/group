var config = {
	apiKey: "AIzaSyDI0B16EYsHtn3zLlbKRzk5nPZvEN5_uSA",
	authDomain: "group-e135d.firebaseapp.com",
	databaseURL: "https://group-e135d.firebaseio.com",
	storageBucket: "",
};

firebase.initializeApp(config);
var dbRef = firebase.database().ref()


function signup () {
	// form for username and password
	username = $('#usernameField').val(); // value inside username field
	password = $('#passwordField').val(); // value inside password field

	var dbUser = {
		username: username,
		password: password
	};
	var usernameCheck = false;
	for (var i = 0; i < allUsers.length; i++) { //runs through array of all users
		if (allUsers[i].username === username) { //if the username already exists change that value to true
			usernameCheck = true;
		}
	}
	if (usernameCheck === false) { // if there where no users already in that database with that name
		dbRef.child('currentUser').set(dbUser); //changes value of current user on firebase to the object dbUser
		allUsers.push(dbUser); // pushes the user object into the array
		dbRef.child('users').set(allUsers); // sends the value of the new array to firebase
		location.href="main.html";
	} else {
		$('#messageDiv').text('Username already exists.'); // if the user does exist show this message
	}
};

$('#signUpBtn').on('click', function() {
	signup();
	return false;
});

$('#usernameField').on('change', function(){
	username = $('#usernameField').val(); // value inside username field
	password = $('#passwordField').val(); // value inside password field
	var usernameCheck = false;
	for (var i = 0; i < allUsers.length; i++) { //runs through array of all users
		if (allUsers[i].username === username) { //if the username already exists change that value to true
			usernameCheck = true;
		}
	}
	if (usernameCheck === false) { //if the username already exists change that value to true
		$('#messageDiv2').text('Username is available.'); // if the user does exist show this message
		$('#messageDiv').empty();
	} else {
		$('#messageDiv').text('Username is already taken.'); // if the user does exist show this message
		$('#messageDiv2').empty();
	}
});

dbRef.on('value', function(snapshot) {
	allUsers = snapshot.val().users;
	for (var i = 0; i < allUsers.length; i++) {
		if (allUsers[i] === undefined) { // removes all undefined/missing users
			allUsers.splice(i,1);
			i--;
		}
	}
}, function(error) {
	console.error(error);
});