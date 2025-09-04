document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('registerForm');
    const successMessage = document.getElementById('successMessage');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Toggle password visibility
    function setupPasswordToggle(toggleElement, inputElement) {
        toggleElement.addEventListener('click', function() {
            const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
            inputElement.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
            this.classList.toggle('fa-eye');
        });
    }
    
    setupPasswordToggle(togglePassword, passwordInput);
    setupPasswordToggle(toggleConfirmPassword, confirmPasswordInput);
    
    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Reset error messages and styles
        document.querySelectorAll('[id$="-error"]').forEach(el => {
            el.classList.add('hidden');
        });
        
        document.querySelectorAll('.input-field').forEach(input => {
            input.classList.remove('border-red-500');
        });
        
        // Validate full name
        const fullname = document.getElementById('fullname').value.trim();
        if (!fullname) {
            showError('fullname', 'Por favor ingresa tu nombre completo');
            isValid = false;
        }
        
        // Validate username
        const username = document.getElementById('username').value.trim();
        if (!username || username.length < 3) {
            showError('username', 'Mínimo 3 caracteres');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Ingresa un correo válido');
            isValid = false;
        }
        
        // Validate password
        const password = document.getElementById('password').value;
        if (password.length < 8) {
            showError('password', 'Mínimo 8 caracteres');
            isValid = false;
        }
        
        // Validate confirm password
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            showError('confirmPassword', 'Las contraseñas no coinciden');
            isValid = false;
        }
        
        // Validate terms checkbox
        if (!document.getElementById('terms').checked) {
            showError('terms', 'Debes aceptar los términos y condiciones');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
            
            // Animate progress bar and redirect
            let width = 0;
            const interval = setInterval(function() {
                if (width >= 100) {
                    clearInterval(interval);
                    // In a real scenario, you would redirect to login
                    console.log('Redirecting to login page...');
                    // window.location.href = 'login.html';
                } else {
                    width += 2;
                    document.getElementById('progressBar').style.width = width + '%';
                }
            }, 50);
        } else {
            // Add shake animation to form
            form.classList.add('error-shake');
            setTimeout(() => {
                form.classList.remove('error-shake');
            }, 500);
        }
    });
    
    // Helper function to show error messages
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        inputElement.classList.add('border-red-500');
    }
    
    // Real-time validation for fields
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const errorId = this.id + '-error';
            const errorElement = document.getElementById(errorId);
            
            if (errorElement && !errorElement.classList.contains('hidden')) {
                // Check if the error is fixed
                if (this.id === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailRegex.test(this.value.trim())) {
                        clearError(this.id);
                    }
                } else if (this.id === 'password') {
                    if (this.value.length >= 8) {
                        clearError(this.id);
                    }
                } else if (this.id === 'confirmPassword') {
                    const password = document.getElementById('password').value;
                    if (this.value === password) {
                        clearError(this.id);
                    }
                } else if (this.id === 'username') {
                    if (this.value.trim().length >= 3) {
                        clearError(this.id);
                    }
                } else if (this.value.trim()) {
                    clearError(this.id);
                }
            }
        });
    });
    
    // Helper function to clear error state
    function clearError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        errorElement.classList.add('hidden');
        inputElement.classList.remove('border-red-500');
    }
});