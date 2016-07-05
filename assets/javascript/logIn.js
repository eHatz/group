function addButtons() {
	$('#header').empty().text("Welcome " + username + " !");
	$('#logInForm').remove();
	$('#logInMessageDiv').remove();
	$('#imgUploaderBtn').append('<button type="button" class="btn btn-default" id="imageBtn">Images</button>');
	$('#imgUploader').append('<input type="file" id="imgLoader">');
	imgSelector();
};


function signIn () {
	username = $('#usernameField').val(); // value inside username field
	password = $('#passwordField').val(); // value inside password field
	var dbUser = {
		username: username,
		password: password
	};
	var usernameCheck = false;
	if (!username) {
		$('#logInMessageDiv').text('Please Enter Username.');
		return false;
	};
	for (var i = 0; i < allUsers.length; i++) { //runs through array of all users
		if ((allUsers[i].username === dbUser.username) && (allUsers[i].password === dbUser.password)) { //if the username already exists change that value to true
			usernameCheck = true;
			addButtons();
		}; 
	};
	if (usernameCheck === false) { // if there where no users already in that database with that name
		$('#logInMessageDiv').text('Invalid Username or Password.');
		};
};

$('#logInBtn').on('click', function(){
	signIn();
	return false;
});


// dbRef.on('value', function(snapshot) {
// 	allUsers = snapshot.val().users;
// }, function(error) {
// 	console.error(error);
// });