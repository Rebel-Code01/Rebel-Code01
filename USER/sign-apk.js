document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const modal = document.getElementById("myModal");
    const modalMessage = document.getElementById("modalMessage");
    const span = document.getElementsByClassName("close")[0];

    // Check if the username already exists
    if (localStorage.getItem(username)) {
        modalMessage.textContent = 'Username already exists. Please choose a different username.';
        modalMessage.style.color = 'red';
        modal.style.display = "block";
    } else {
        // Store the new user data in localStorage
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };
        localStorage.setItem(username, JSON.stringify(userData));
        modalMessage.textContent = 'Registration successful! Redirecting to login...';
        modalMessage.style.color = 'green';
        modal.style.display = "block";
        setTimeout(() => {
            window.location.href = './login-2.html';
        }, 2000);
    }

    // Close the modal when the user clicks on <span> (x)
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
