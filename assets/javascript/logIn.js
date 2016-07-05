var config = {
	apiKey: "AIzaSyDI0B16EYsHtn3zLlbKRzk5nPZvEN5_uSA",
	authDomain: "group-e135d.firebaseapp.com",
	databaseURL: "https://group-e135d.firebaseio.com",
	storageBucket: "",
};

var username;
var password;
var allUsers;


firebase.initializeApp(config);
var dbRef = firebase.database().ref();



// USER SIGNUP FORM
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
		location.href="logIn.html";
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
		$('#messageDiv').text('Username is available.'); // if the user does exist show this message
	} else {
		$('#messageDiv').text('Username is already taken.'); // if the user does exist show this message
	}
});



function signIn () {
	username = $('#usernameField').val(); // value inside username field
	password = $('#passwordField').val(); // value inside password field
	var dbUser = {
		username: username,
		password: password
	};
	var usernameCheck = false;
	for (var i = 0; i < allUsers.length; i++) { //runs through array of all users
		if ((allUsers[i].username === dbUser.username) && (allUsers[i].password === dbUser.password)) { //if the username already exists change that value to true
			usernameCheck = true;
			location.href="main.html";
		};
	};
	if (usernameCheck === false) { // if there where no users already in that database with that name
			$('#logInMessageDiv').text('Invalid Username or Password.');
		}
};

$('#logInBtn').on('click', function(){
	signIn();
	return false;
});


dbRef.on('value', function(snapshot) {
	allUsers = snapshot.val().users;
}, function(error) {
	console.error(error);
});