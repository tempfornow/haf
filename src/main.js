// Label color when input is invalid\valid(or unverified yet)
const ERR_COLOR = 'red'
const VALID_COLOR = 'black'

const MIN_PASSWORD_LEN = 8
const LOGIN_FORM_ID = 'login-form'
const USERNAME_INPUT_ID = 'username'
const PASSWORD_INPUT_ID = 'password'
const LOGIN_BUTTON_ID = 'login-button'



function isValidPassword(pass) {
	return pass.length >= MIN_PASSWORD_LEN && !pass.includes(' ')
}

function isValidUsername(username) {
	return username.length && username.split('').every(function(e) { 
		return RegExp('[a-z0-9_\-]').test(e)   
	});
}


// Checks validity of username an password and
// returns errors dictionary(empty if everything is valid)
function getErrors(username, pass) {
	var errors = {}
	
	if(!isValidUsername(username)) {
		errors[USERNAME_INPUT_ID] = 'על שם המשתמש להכיל אותיות קטנות, קו תחתון, מקף ומספרים בלבד!'
	}
	
	if(!isValidPassword(pass)) {
		errors[PASSWORD_INPUT_ID] = 'על הסיסמא להכיל לפחות 8 תווים ולא להכיל רווחים!'			
	}
	
	return errors;
}

// Mark errors in the corresponding inputs
// According to errors dictionary
function markErrors(errorsDic) {
	
	// Iterate over input IDs and mark errors
	_.forOwn(errorsDic, function(error, inputId) { 
		$('#' + inputId).closest('.form-group').addClass('has-error')
		$('#' + inputId).siblings('.help-block').html(error)
	} );
}

function clearErrors() {
	
	// Clear errors
	$(".help-block").html("");
	
	// Clear warning css
	$("#username").closest('.form-group').removeClass('has-error')
	$("#password").closest('.form-group').removeClass('has-error')
	
}

// Activated when login button is pressed.
// Checks the validity of username and password fields
// and altering the ui respectively
function login(){
	
	// Clear error messages and css marks of
	// invalid fields
	clearErrors()
	
	var username = $('#' + USERNAME_INPUT_ID).val()
	var pass = $('#' + PASSWORD_INPUT_ID).val()
	
	// Get errors dictionary.Dictionary keys 
	// are invalid input ids and values 
	// are corresponding errors
	errorsDic = getErrors(username, pass)
	markErrors(getErrors(username, pass))
	
	if(_.isEmpty(errorsDic)) {
		$('#' + LOGIN_BUTTON_ID).remove()
		$('#' + LOGIN_FORM_ID).fadeOut('slow', function() {
			$(this).html('<div class = "text-center">ההתחברות עברה בהצלחה!</div>')
			$(this).fadeIn('slow')
		});
	} else {
		markErrors(errorsDic)
	}
}

// Register event listeners for close button and login button
$('#' + LOGIN_BUTTON_ID).click(login)

// Change sort glyphicons onclick 
$(".glyphicon-arrow-down").click(function() { 
	$(this).toggleClass("glyphicon-arrow-down").toggleClass("glyphicon-arrow-up")});