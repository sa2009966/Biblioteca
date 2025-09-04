document.addEventListener('DOMContentLoaded', function() {
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForms = document.querySelectorAll('.payment-form');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            const methodId = this.getAttribute('data-method');
            
            // Update radio button
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Show corresponding form
            paymentForms.forEach(form => form.classList.add('hidden'));
            document.getElementById(`${methodId}-form`).classList.remove('hidden');
        });
    });

    // Card number formatting
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let matches = value.match(/\d{4,16}/g);
            let match = matches && matches[0] || '';
            let parts = [];
            
            for (let i=0, len=match.length; i<len; i+=4) {
                parts.push(match.substring(i, i+4));
            }
            
            if (parts.length) {
                e.target.value = parts.join(' ');
            } else {
                e.target.value = value;
            }
            
            // Detect card type
            const cardType = document.getElementById('card-type');
            if (/^4/.test(value)) {
                cardType.innerHTML = '<i class="fab fa-cc-visa text-blue-900"></i>';
            } else if (/^5[1-5]/.test(value)) {
                cardType.innerHTML = '<i class="fab fa-cc-mastercard text-red-500"></i>';
            } else if (/^3[47]/.test(value)) {
                cardType.innerHTML = '<i class="fab fa-cc-amex text-blue-500"></i>';
            } else if (/^6(?:011|5)/.test(value)) {
                cardType.innerHTML = '<i class="fab fa-cc-discover text-orange-500"></i>';
            } else {
                cardType.innerHTML = '<i class="far fa-credit-card"></i>';
            }
        });
    }

    // Expiry date formatting
    const expiryInput = document.getElementById('card-expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // Toggle CVV visibility
    const toggleCvv = document.getElementById('toggle-cvv');
    if (toggleCvv) {
        toggleCvv.addEventListener('click', function() {
            const cvvInput = document.getElementById('card-cvv');
            const icon = this.querySelector('i');
            
            if (cvvInput.type === 'password') {
                cvvInput.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                cvvInput.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    }

    // Form validation and payment processing
    const payButton = document.getElementById('pay-button');
    if (payButton) {
        payButton.addEventListener('click', function() {
            const selectedPayment = document.querySelector('input[name="payment"]:checked').id;
            let isValid = true;
            
            if (selectedPayment === 'card') {
                // Validate card form
                const cardName = document.getElementById('card-name');
                const cardNumber = document.getElementById('card-number');
                const cardExpiry = document.getElementById('card-expiry');
                const cardCvv = document.getElementById('card-cvv');
                
                // Reset errors
                document.querySelectorAll('[id$="-error"]').forEach(el => {
                    el.classList.add('hidden');
                    el.previousElementSibling.classList.remove('border-red-500', 'input-error');
                });
                
                // Validate name
                if (!cardName.value.trim()) {
                    document.getElementById('card-name-error').classList.remove('hidden');
                    cardName.classList.add('border-red-500', 'input-error');
                    isValid = false;
                }
                
                // Validate card number (simple check for 16 digits)
                const cardNumberClean = cardNumber.value.replace(/\s/g, '');
                if (cardNumberClean.length < 16 || !/^\d+$/.test(cardNumberClean)) {
                    document.getElementById('card-number-error').classList.remove('hidden');
                    cardNumber.classList.add('border-red-500', 'input-error');
                    isValid = false;
                }
                
                // Validate expiry (MM/YY format)
                if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardExpiry.value)) {
                    document.getElementById('card-expiry-error').classList.remove('hidden');
                    cardExpiry.classList.add('border-red-500', 'input-error');
                    isValid = false;
                }
                
                // Validate CVV (3 or 4 digits)
                if (!/^\d{3,4}$/.test(cardCvv.value)) {
                    document.getElementById('card-cvv-error').classList.remove('hidden');
                    cardCvv.classList.add('border-red-500', 'input-error');
                    isValid = false;
                }
            }
            
            if (isValid) {
                // Show success modal
                document.getElementById('success-modal').classList.remove('hidden');
            }
        });
    }

    // Modal buttons
    document.getElementById('continue-shopping').addEventListener('click', function() {
        // In a real app, this would redirect to the home page
        alert('Redirigiendo a la página principal');
        document.getElementById('success-modal').classList.add('hidden');
    });
    
    document.getElementById('view-order').addEventListener('click', function() {
        // In a real app, this would redirect to the order details
        alert('Mostrando detalles del pedido');
        document.getElementById('success-modal').classList.add('hidden');
    });
});