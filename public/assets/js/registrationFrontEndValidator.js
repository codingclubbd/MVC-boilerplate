//selection
// username
const usernameInputEl = document.getElementById('userName');
const usernameErrorEl = document.getElementById('usernameError');

// email
const emailInputEl = document.getElementById('email');
const emailErrorEl = document.getElementById('emailError');

//password
const passwordEl = document.getElementById('password');
const passwordError = document.getElementById("passwordError");
// confirm password
const confirmPasswordEl = document.getElementById('confirm_password');
const confirmPassErr = document.getElementById('confirmPasswordError')


// hidden the error 
usernameErrorEl.hidden = true;
emailErrorEl.hidden = true;
confirmPassErr.hidden = true;
passwordError.hidden = true;

// typing detector
let typingTimer;
const doneTypingInterval = 500;


//on keyup, start the countdown
usernameInputEl.addEventListener("keyup", function () {
  clearTimeout(typingTimer);
  // reset
  usernameErrorEl.hidden = true;

  if (usernameInputEl.value) {
    typingTimer = setTimeout(searchUsers, doneTypingInterval);
  }
});

//on keydown, clear the countdown
usernameInputEl.addEventListener("keydown", function () {
  clearTimeout(typingTimer);
});

// send request for search
async function searchUsers() {
  const username = usernameInputEl.value;
  const response = await fetch(`http://localhost:3000/api/auth/checkUsername/${username}`);

  const result = await response.json()
  usernameErrorEl.hidden = false;
  usernameErrorEl.innerHTML = result.msg;
  if (result.status) {
    usernameErrorEl.style.color = "green"
  } else {
    usernameErrorEl.style.color = "red"
  }
}


//on keyup, start the countdown
emailInputEl.addEventListener("keyup", function () {
  clearTimeout(typingTimer);
  // reset
  emailErrorEl.hidden = true;

  if (emailInputEl.value) {
    typingTimer = setTimeout(checkEmail, doneTypingInterval);
  }
});

//on keydown, clear the countdown
emailInputEl.addEventListener("keydown", function () {
  clearTimeout(typingTimer);
});

//check email function
async function checkEmail() {
  const email = emailInputEl.value;

  const isValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  if (isValid) {
    const response = await fetch(`http://localhost:3000/api/auth/checkEmail/${email}`);

    const result = await response.json()

    if (!result.status) {
      emailErrorEl.hidden = false;
      emailErrorEl.innerHTML = result.msg;
      emailErrorEl.style.color = "red"
    }

  } else {
    emailErrorEl.hidden = false;
    emailErrorEl.textContent = "Email is not valid!";
    emailErrorEl.style.color = "red"
  }
}

// password validator
function validate(p) {
  var errors = []

  if (p.length < 8) {
    errors.push("8 characters")
  }
  if (p.search(/[a-z]/) < 0) {
    errors.push("1 lowercase letter")
  }
  if (p.search(/[A-Z]/) < 0) {
    errors.push("1 uppercase letter")
  }
  if (p.search(/[0-9]/) < 0) {
    errors.push("1 digit.")
  }
  if (p.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:\-]/) < 0) {
    errors.push("1 special character.")
  }

  return errors;
}


// check password
const checkPassword = (password, confirmPassword) => {
  let validationResult = []
  if (password) {
     validationResult = validate(password)
  }

  if (validationResult.length > 0) {
    const errorMsg = "Your password must contain at least " + validationResult.join(',');

    if (password) {
      passwordError.hidden = false;
      passwordError.textContent = errorMsg

    }

  }

  if (confirmPassword) {
     
    if (!(passwordEl.value === confirmPasswordEl.value)) {
      confirmPassErr.hidden = false;
      confirmPassErr.textContent = "Password doesn't match"
    } else {
      confirmPassErr.hidden = true;
      confirmPassErr.textContent = ''
    }
  }

}




//on keyup, start the countdown
passwordEl.addEventListener("keyup", function () {
  clearTimeout(typingTimer);
  // reset
  passwordError.hidden = true;

  if (passwordEl.value) {
    typingTimer = setTimeout(() => checkPassword(passwordEl.value), doneTypingInterval);
  }
});

//on keydown, clear the countdown
passwordEl.addEventListener("keydown", function () {
  clearTimeout(typingTimer);
});




//on keyup, start the countdown
confirmPasswordEl.addEventListener("keyup", function () {
  clearTimeout(typingTimer);
  // reset
  confirmPassErr.hidden = true;

  if (confirmPasswordEl.value) {
    typingTimer = setTimeout(() => checkPassword(null, confirmPasswordEl.value), doneTypingInterval);
  }
});

//on keydown, clear the countdown
confirmPasswordEl.addEventListener("keydown", function () {
  clearTimeout(typingTimer);
});



