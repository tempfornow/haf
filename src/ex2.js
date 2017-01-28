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

function verify(username, pass) {
	var err = ""
	
	if(!isValidUsername(username)) {
		err += "*Invalid username format: \
			username should should contain only\
			small latters,digits,dash and lodash"
	}
	
	if(!isValidPassword(pass)) {
		err += "*Invalid password format - password \
			should contain at least 8 characters \
			and no backspace characters"
	}
	
	return err;
}

function setErr(err) {
	document.getElementById("errors").innerHTML = "<font color=\"red\">" + err + "</font>"
}

function clearErrSection() {
	setErr("")
}

function login(){
	clearErrSection();
	
	var username = document.getElementById("username").value
	var pass = document.getElementById("password").value
	
	var err = verify(username, pass)
	if(!err) {
		document.getElementById("login-form").innerHTML="<h1>success</h1>"
	} else {
		setErr(err)
	}
	
	// if(isValidPassword(pass) && isValidUsername(username)) {
		// // print a success message instead of login form
		// document.getElementById("login-form").innerHTML="<h1>success</h1>"
	// }
}