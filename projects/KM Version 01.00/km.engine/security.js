// security.js

document.addEventListener("DOMContentLoaded", function () {
    // Find the form and input elements by their IDs
    const form = document.getElementById("password-form");
    const passwordInput = document.getElementById("password");

    // Add an event listener for form submission
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Get the entered password from the input field
        const enteredPassword = passwordInput.value;

        // Check the entered password (replace this with your own logic)
        if (enteredPassword === "") {
            alert("Access granted! You entered the correct password.");
        } else {
            alert("Access denied! Incorrect password.");
        }
    });
});
