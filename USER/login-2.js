
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const modal = document.getElementById("loginModal");
    const modalMessage = document.getElementById("loginMessage");
    const span = document.getElementsByClassName("close")[0];

    const storedUser = localStorage.getItem(username);
    if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.password === password) {
            // Store the logged-in username in local storage
            localStorage.setItem('loggedInUser', username);
            modalMessage.textContent = `Welcome, ${username}! Redirecting...`;
            modalMessage.style.color = 'green';
            modal.style.display = "block";
            setTimeout(() => {
                window.location.href = "../Web/wen2.0.html";
            }, 2000);
        } else {
            modalMessage.textContent = 'Invalid credentials. Please try again.';
            modalMessage.style.color = 'red';
            modal.style.display = "block";
        }
    } else {
        modalMessage.textContent = 'User not found.';
        modalMessage.style.color = 'red';
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});