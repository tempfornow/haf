// Label color when input is invalid\valid(or unverified yet)
const ERR_COLOR = 'red'
const VALID_COLOR = 'black'

const MIN_PASSWORD_LEN = 8
const USERNAME_LABEL_ID = 'username-label'
const LOGIN_FORM_ID = 'login-form'
const PASSWORD_LABEL_ID = 'password-label'
const USERNAME_INPUT_ID = 'username'
const PASSWORD_INPUT_ID = 'password'
const ERRORS_SECTION_ID = 'errors'
const LOGIN_BUTTON_ID = 'login-button'
const CLOSE_BUTTON_ID = 'close-button'



function isValidPassword(pass) {
	return pass.length >= MIN_PASSWORD_LEN && !pass.includes(' ')
}

function isValidUsername(username) {
	return username.length && username.split('').every(function(e) { 
		return RegExp('[a-z0-9_\-]').test(e)   
	});
}

function markLabel(labelId) {
	document.getElementById(labelId).style.color = ERR_COLOR
}

function unmarkLabel(labelId) {
	document.getElementById(labelId).style.color = VALID_COLOR
}

// Checks validity of username an password and
// returns errors list(empty if everything is valid)
function verify(username, pass) {
	var errors = []
	
	if(!isValidUsername(username)) {
		markLabel(USERNAME_LABEL_ID);
		errors.push('*Invalid username format: \
			username should should contain only\
			small latters,digits,dash and lodash')
	}
	
	if(!isValidPassword(pass)) {
		markLabel(PASSWORD_LABEL_ID);
		errors.push('*Invalid password format - password \
			should contain at least 8 characters \
			and no backspace characters')
	}
	
	return errors;
}

function setErr(errors) {
	// Clear errors section
	document.getElementById(ERRORS_SECTION_ID).innerHTML = ""
	
	// Print each error to section
	errors.forEach( function(err) {
		document.getElementById(ERRORS_SECTION_ID).innerHTML += 
			'<font color=\"red\">' + err + '</font><br/>'
	});
}

function clearErrors() {
	setErr([])
	unmarkLabel(USERNAME_LABEL_ID)
	unmarkLabel(PASSWORD_LABEL_ID)
}

// Activated when login button is pressed
// checks the validity of username and password fields
// and altering the ui respectively
function login(){
	clearErrors()
	
	var username = document.getElementById(USERNAME_INPUT_ID).value
	var pass = document.getElementById(PASSWORD_INPUT_ID).value
	
	var err = verify(username, pass)
	if(!err.length) {
		document.getElementById(LOGIN_FORM_ID).innerHTML='<h1>success</h1>'
	} else {
		setErr(err)
	}	
}

function hideLoginForm() {
	document.getElementById(LOGIN_FORM_ID).style.visibility = 'hidden'
}

// Register event listeners for close button and login button
document.getElementById(LOGIN_BUTTON_ID).addEventListener("click", login)
document.getElementById(CLOSE_BUTTON_ID).addEventListener("click", hideLoginForm)