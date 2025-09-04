// Importar el servicio de contacto
import contactService from '../main/api/services/contactService';

const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const privacyCheckbox = document.getElementById('privacy');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const subjectError = document.getElementById('subject-error');
const messageError = document.getElementById('message-error');
const privacyError = document.getElementById('privacy-error');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const successMessage = document.getElementById('success-message');
const submitButton = document.getElementById('submit-button');
const closeSuccess = document.getElementById('close-success');
const closeError = document.getElementById('close-error');

// Form validation
function validateForm() {
    let isValid = true;
    
    // Reset error states
    nameError.classList.add('hidden');
    emailError.classList.add('hidden');
    subjectError.classList.add('hidden');
    messageError.classList.add('hidden');
    privacyError.classList.add('hidden');
    errorMessage.classList.add('hidden');
    contactForm.classList.remove('shake');
    
    // Name validation
    if (!nameInput.value.trim()) {
        nameError.classList.remove('hidden');
        isValid = false;
    }
    
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
    
    // Subject validation
    if (!subjectInput.value) {
        subjectError.classList.remove('hidden');
        isValid = false;
    }
    
    // Message validation
    if (!messageInput.value.trim()) {
        messageError.classList.remove('hidden');
        isValid = false;
    }
    
    // Privacy checkbox validation
    if (!privacyCheckbox.checked) {
        privacyError.classList.remove('hidden');
        isValid = false;
    }
    
    return isValid;
}

// Form submission
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        try {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
            
            // Preparar los datos del formulario
            const contactData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            };
            
            // Enviar el mensaje usando el servicio
            await contactService.sendMessage(contactData);
            
            // Mostrar mensaje de éxito
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            
            // Resetear el formulario
            contactForm.reset();
            
            // Resetear el botón
            submitButton.disabled = false;
            submitButton.innerHTML = '<span class="absolute left-0 inset-y-0 flex items-center pl-3"><i class="fas fa-paper-plane text-amber-300 group-hover:text-amber-200"></i></span>Enviar mensaje';
            
            // Ocultar mensaje de éxito después de 5 segundos
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
            
        } catch (error) {
            // Manejar errores
            errorText.textContent = error.response?.data?.message || 'Error al enviar el mensaje';
            errorMessage.classList.remove('hidden');
            contactForm.classList.add('shake');
            
            // Resetear el botón
            submitButton.disabled = false;
            submitButton.innerHTML = '<span class="absolute left-0 inset-y-0 flex items-center pl-3"><i class="fas fa-paper-plane text-amber-300 group-hover:text-amber-200"></i></span>Enviar mensaje';
        }
    } else {
        // Mostrar mensaje de error general
        errorText.textContent = 'Por favor corrige los errores en el formulario';
        errorMessage.classList.remove('hidden');
        contactForm.classList.add('shake');
    }
});

// Cerrar mensaje de éxito
closeSuccess.addEventListener('click', function() {
    successMessage.classList.add('hidden');
});

// Cerrar mensaje de error
closeError.addEventListener('click', function() {
    errorMessage.classList.add('hidden');
});