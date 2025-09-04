// Importar el servicio de autenticación
import authService from '../main/api/services/authService';

// DOM elements
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const successMessage = document.getElementById('success-message');
const submitButton = document.getElementById('submit-button');

// Form validation
function validateForm() {
    let isValid = true;
    
    // Reset error states
    emailError.classList.add('hidden');
    passwordError.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loginForm.classList.remove('shake');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Por favor ingresa tu correo electrónico';
        emailError.classList.remove('hidden');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Por favor ingresa un correo electrónico válido';
        emailError.classList.remove('hidden');
        isValid = false;
    }
    
    // Password validation
    if (!passwordInput.value.trim()) {
        passwordError.textContent = 'Por favor ingresa tu contraseña';
        passwordError.classList.remove('hidden');
        isValid = false;
    } else if (passwordInput.value.trim().length < 6) {
        passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres';
        passwordError.classList.remove('hidden');
        isValid = false;
    }
    
    return isValid;
}

// Form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        try {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Procesando...';
            
            // Llamar al servicio de autenticación
            const response = await authService.login(
                emailInput.value.trim(),
                passwordInput.value.trim()
            );
            
            // Éxito en el login
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            
            // Redirigir después de un breve delay
            setTimeout(() => {
                window.location.href = '/main/index.html';
            }, 1500);
            
        } catch (error) {
            // Manejar errores
            errorText.textContent = error.response?.data?.message || 'Error al iniciar sesión';
            errorMessage.classList.remove('hidden');
            loginForm.classList.add('shake');
            successMessage.classList.add('hidden');
            
            // Resetear el botón
            submitButton.disabled = false;
            submitButton.innerHTML = '<span class="absolute left-0 inset-y-0 flex items-center pl-3"><i class="fas fa-sign-in-alt text-amber-300 group-hover:text-amber-200"></i></span>Iniciar sesión';
        }
    } else {
        // Mostrar mensaje de error general
        errorText.textContent = 'Por favor corrige los errores en el formulario';
        errorMessage.classList.remove('hidden');
        loginForm.classList.add('shake');
    }
});

// Verificar si el usuario ya está autenticado
document.addEventListener('DOMContentLoaded', () => {
    if (authService.isAuthenticated()) {
        window.location.href = '/main/index.html';
    }
});