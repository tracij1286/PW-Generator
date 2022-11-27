const generateBtn = document.querySelector('#generate');

// Function for #pw input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Added event listener to the button
generateBtn.addEventListener('click', writePassword);

// Generate password with a min of 8 characters and max 128
function generatePassword() {
  let pwLength = parseInt(prompt('Enter a number between 8-128'), 10);
  while (pwLength < 8 || pwLength > 128 || Number.isNaN(pwLength) || pwLength === null) {
    alert("That's not a valid number. Please enter a number from 8-128.");
    pwLength = prompt('Enter a number between 8-128');
  }

  // Defining variables for upper, lower numbers and special characters
  let confirmUpper = false;
  let confirmLower = false;
  let confirmNumber = false;
  let confirmSpecial = false;

  // " If "answers are false, it'll loop back through to get atleast one true.
  while (confirmUpper === false && confirmLower === false
    && confirmNumber === false && confirmSpecial === false) {
    alert('Please select a type of character');
    confirmUpper = confirm('Would you like to include upper case letters?');
    confirmLower = confirm('Would you like to include lower case letters?');
    confirmNumber = confirm('Would you like to include numbers?');
    confirmSpecial = confirm('Would you like to include special characters?');
  }

  // Character Arrays
  const upperCaseChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const lowerCaseChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const numericChar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const specialChar = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', '|', '[', ']', ';', "'", ':', '<', '>', '?', '/'];

  // Array created based on the answers
  const passwordPool = [];

  // arrays containing the options the user chose to include in the pw
  function generateChar() {
    if (confirmLower) {
      passwordPool.push(...lowerCaseChar);
    }
    if (confirmUpper) {
      passwordPool.push(...upperCaseChar);
    }
    if (confirmNumber) {
      passwordPool.push(...numericChar);
    }
    if (confirmSpecial) {
      passwordPool.push(...specialChar);
    }
  }
  generateChar();
  console.log(passwordPool);

  // last array, random characters from the pool
  function pushChar() {
    const randomPassword = [];
    for (let i = 0; i < pwLength; i += 1) {
      const item = passwordPool[Math.floor(Math.random() * passwordPool.length)];
      randomPassword.push(item);
    }
    return randomPassword;
  }

  // checking if all conditions were met to generate pw
  function checkPassword(password) {
    const checkUpper = (upperCaseChar.some((ele) => password.includes(ele)));
    const checkLower = (lowerCaseChar.some((ele) => password.includes(ele)));
    const checkNumeric = (numericChar.some((ele) => password.includes(ele)));
    const checkSpecial = (specialChar.some((ele) => password.includes(ele)));

    console.log(checkUpper);
    console.log(checkLower);
    console.log(checkNumeric);
    console.log(checkSpecial);

    return checkUpper === confirmUpper
      && checkLower === confirmLower
      && checkNumeric === confirmSpecial
      && checkSpecial === confirmNumber;
  }

  let password = [];
  while (!checkPassword(password)) {
    password = pushChar();
  }

  // randomly generated pw, a string.
  return password.join('');
}