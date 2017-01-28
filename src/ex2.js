// Label color when input is invalid\valid(or unverified yet)
const ERR_COLOR = "red"
const VALID_COLOR = "black"


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

function markLabel(labelId) {
	document.getElementById(labelId).style.color = ERR_COLOR
}

function unmarkLabel(labelId) {
	document.getElementById(labelId).style.color = VALID_COLOR
}

function verify(username, pass) {
	var err = ""
	
	if(!isValidUsername(username)) {
		markLabel("username-label");
		err += "*Invalid username format: \
			username should should contain only\
			small latters,digits,dash and lodash"
	}
	
	if(!isValidPassword(pass)) {
		markLabel("password-label");
		err += "*Invalid password format - password \
			should contain at least 8 characters \
			and no backspace characters"
	}
	
	return err;
}

function setErr(err) {
	document.getElementById("errors").innerHTML = "<font color=\"red\">" + err + "</font>"
}

function clearErrors() {
	setErr("")
	unmarkLabel("username-label")
	unmarkLabel("password-label")
}

function login(){
	clearErrors();
	
	var username = document.getElementById("username").value
	var pass = document.getElementById("password").value
	
	var err = verify(username, pass)
	if(!err) {
		document.getElementById("login-form").innerHTML="<h1>success</h1>"
	} else {
		setErr(err)
	}	
}