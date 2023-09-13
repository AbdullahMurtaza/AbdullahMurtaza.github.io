// security.js

// Define your secret password
const secretPassword = "923090333309";

// Function to check if the entered password is correct
function checkPassword() {
  const enteredPassword = prompt("Enter the password to access this site:");

  if (enteredPassword === secretPassword) {
    // Password is correct, allow access
    alert("Access granted! Welcome to the site.");
  } else {
    // Password is incorrect, deny access
    alert("Access denied. Incorrect password.");
    // You can choose to redirect the user or take other actions here
  }
}

// Call the checkPassword function when the page loads
window.addEventListener("load", checkPassword);
