function hideLoginForm() {
	document.getElementById("login-form").style.visibility = "hidden"
}


function isValidPassword(pass) {
	return pass.length >= 8 && !pass.includes(" ")
}

function isValidUsername(username) {
	return username.length && username.split("").every(function(e) { 
		return RegExp("[a-z0-9_\-]").test(e)   
	});
}

function login(){
	var pass = document.getElementById("password").value
	var username = document.getElementById("username").value
	console.log(pass, username)
	if(isValidPassword(pass) && isValidUsername(username)) {
		// print a success message instead of login form
		document.getElementById("login-form").innerHTML="<h1>success</h1>"
	}
}