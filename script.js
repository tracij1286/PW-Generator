var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Added event listener to the button
generateBtn.addEventListener('click', writePassword);

// Generate password with a min of 8 characters and max 128
function generatePassword() {
  var pwLength = parseInt(prompt('Enter a number between 8-128'), 10);
  while (pwLength > 128 || pwLength < 8 || Number.isNaN(pwLength) || pwLength == undefined) {
    alert("Sorry, That's not a valid number. Please enter a number from 8-128.");
    pwLength = prompt('Please enter a number from 8-128');
  }

  // Variables for upper, lower, numbers and special characters
  var confirmUpper = false;
  var confirmLower = false;
  var confirmSpecial = false;
  var confirmNumber = false;

  // looping back through to get one true.
  while (confirmUpper == false && confirmLower == false
    && confirmNumber == false && confirmSpecial == false) {

    alert('Please select a type of character');
    confirmUpper = confirm('Would you like to include upper case letters? select OK if Yes, Cancel if No?');
    confirmLower = confirm('Would you like to include lower case letters? select OK if Yes, Cancel if No?');
    confirmNumber = confirm('Would you like to include numbers? select OK if Yes, Cancel if No?');
    confirmSpecial = confirm('Would you like to include special characters? select OK if Yes, Cancel if No?');
  }

  // Character Arrays
  var upperCaseChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  var lowerCaseChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var specialChar = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', '|', '[', ']', ';', "'", ':', '<', '>', '?', '/'];
  var numericChar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  // Array created based on the responses
  var passwordPool = [];

  // arrays containing the options the user chose to include in the pw
  function generateChar() {
    if (confirmLower) {
      passwordPool.push(...lowerCaseChar);
    }
    if (confirmUpper) {
      passwordPool.push(...upperCaseChar);
    }
    if (confirmSpecial) {
      passwordPool.push(...specialChar);
    }
    if (confirmNumber) {
      passwordPool.push(...numericChar);
    }
  }
  generateChar();
  console.log(passwordPool);

  // last array, random characters from the pool
  function pushChar() {
    var randomPassword = [];
    for (var i = 0; i < pwLength; i += 1) {
      var item = passwordPool[Math.floor(Math.random() * passwordPool.length)];
      randomPassword.push(item);
    }
    return randomPassword;
  }

  // checking if all conditions were met to generate pw
  function checkPassword(password) {
    var checkUpper = (upperCaseChar.some((ele) => password.includes(ele)));
    var checkLower = (lowerCaseChar.some((ele) => password.includes(ele)));
    var checkNumeric = (numericChar.some((ele) => password.includes(ele)));
    var checkSpecial = (specialChar.some((ele) => password.includes(ele)));

    console.log(checkLower);
    console.log(checkUpper);
    console.log(checkNumeric);
    console.log(checkSpecial);

    return checkUpper == confirmUpper
      && checkLower == confirmLower
      && checkNumeric == confirmNumber
      && checkSpecial == confirmSpecial;
  }

  var password = [];
  while (!checkPassword(password)) {
    password = pushChar();
  }

  // randomly generated pw
  return password.join('');
}