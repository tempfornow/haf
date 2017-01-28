// Label color when input is invalid\valid(or unverified yet)
const ERR_COLOR = 'red'
const VALID_COLOR = 'black'

const MIN_PASSWORD_LEN = 8
const USERNAME_LABEL_ID = 'username-label'
const LOGIN_FORM_ID = 'login-form'
const PASSWORD_LABEL_ID = 'password-label'
const USERNAME_INPUT_ID = 'username'
const PASSWORD_INPUT_ID = 'password'

function hideLoginForm() {
	document.getElementById(LOGIN_FORM_ID).style.visibility = 'hidden'
}

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


function verify(username, pass) {
	var err = ''
	
	if(!isValidUsername(username)) {
		markLabel(USERNAME_LABEL_ID);
		err += '*Invalid username format: \
			username should should contain only\
			small latters,digits,dash and lodash'
	}
	
	if(!isValidPassword(pass)) {
		markLabel(PASSWORD_LABEL_ID);
		err += '*Invalid password format - password \
			should contain at least 8 characters \
			and no backspace characters'
	}
	
	return err;
}

function setErr(err) {
	document.getElementById('errors').innerHTML = 
		'<font color=\"red\">' + err + '</font>'
}

function clearErrors() {
	setErr('')
	unmarkLabel(USERNAME_LABEL_ID)
	unmarkLabel(PASSWORD_LABEL_ID)
}

function login(){
	clearErrors()
	
	var username = document.getElementById(USERNAME_INPUT_ID).value
	var pass = document.getElementById(PASSWORD_INPUT_ID).value
	
	var err = verify(username, pass)
	if(!err) {
		document.getElementById(LOGIN_FORM_ID).innerHTML='<h1>success</h1>'
	} else {
		setErr(err)
	}	
}