document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('togglePassword');
    const errorMessage = document.getElementById('errorMessage');
    const requirementsButton = document.getElementById('requirementsButton');

    function validatePassword(password) {
        if (password.length !== 16) {
            return 'Password must be exactly 16 characters.';
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{16}$/.test(password)) {
            return 'Password must contain at least one uppercase letter, one lowercase letter, and one number.';
        }
        return '';
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        const passwordError = validatePassword(password);

        if (passwordError) {
            errorMessage.textContent = passwordError;
            passwordInput.value = '';
        } else {
            errorMessage.textContent = '';
            console.log('Login attempt:', { username, password });
            // Here you would typically send a request to your backend to verify the credentials
            // For this example, we'll just simulate a successful login
            window.location.href = 'http://127.0.0.1:5500/Dashboard/Dashboard.html';
        }
    });

    togglePasswordButton.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('svg').style.display = type === 'password' ? 'block' : 'none';
    });

    requirementsButton.addEventListener('click', function() {
        alert('Password Requirements:\n\n' +
              '- Must be exactly 16 characters long\n' +
              '- Must contain at least one uppercase letter\n' +
              '- Must contain at least one lowercase letter\n' +
              '- Must contain at least one number');
    });
});