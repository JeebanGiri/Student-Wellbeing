// Get form element
const form = document.getElementById('contact-form');

// Success and error messages
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validation and submission logic (replace with your own logic)
    if (name && email && message) {
        // Simulate successful form submission
        successMessage.classList.remove('hidden');
        form.reset();
    } else {
        // Simulate form submission error
        errorMessage.classList.remove('hidden');
    }
});


// const signUpButton = document.getElementById('signUp');
// const signInButton = document.getElementById('signIn');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
// 	container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classList.remove("right-panel-active");
// });