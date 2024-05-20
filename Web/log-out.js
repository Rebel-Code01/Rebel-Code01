
window.onload = function() {
    const loginItem = document.getElementById('loginItem');
    const sidebar = document.getElementById('sidebar');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        const userIcon = document.createElement('div');
        userIcon.className = 'user-icon';
        userIcon.textContent = loggedInUser.charAt(0).toUpperCase();
        loginItem.innerHTML = ''; // Clear the existing login link
        loginItem.appendChild(userIcon); // Add the user icon

        userIcon.addEventListener('click', function(event) {
            event.stopPropagation();
            sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
        });
    }

    document.addEventListener('click', function(event) {
        if (!loginItem.contains(event.target) && !sidebar.contains(event.target)) {
            sidebar.style.display = 'none';
        }
    });

    document.getElementById('logout').addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('loggedInUser');
        location.reload();
    });

    document.getElementById('profile').addEventListener('click', function(event) {
        event.preventDefault();
        alert('Profile clicked');
    });
    document.getElementById('settings').addEventListener('click', function(event) {
        event.preventDefault();
        alert('Settings clicked');
    });
}