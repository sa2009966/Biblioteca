// Configuración base de Axios
const API_CONFIG = {
    baseURL: 'http://localhost:3000/api', // URL base de tu API
    timeout: 5000, // Timeout de 5 segundos
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

// Configuración de endpoints
const ENDPOINTS = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout'
    },
    contact: {
        send: '/contact/send'
    },
    shop: {
        products: '/shop/products',
        categories: '/shop/categories'
    }
};

export { API_CONFIG, ENDPOINTS }; 