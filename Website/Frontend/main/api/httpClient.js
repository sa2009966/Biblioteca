import axios from 'axios';
import { API_CONFIG } from './config';

// Crear instancia de axios con la configuración base
const httpClient = axios.create(API_CONFIG);

// Interceptor para peticiones
httpClient.interceptors.request.use(
    (config) => {
        // Obtener el token del localStorage
        const token = localStorage.getItem('auth_token');
        
        // Si existe un token, agregarlo al header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para respuestas
httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // El servidor respondió con un código de error
            switch (error.response.status) {
                case 401:
                    // No autorizado - redirigir al login
                    localStorage.removeItem('auth_token');
                    window.location.href = '/login';
                    break;
                case 403:
                    // Prohibido - mostrar mensaje de error
                    console.error('No tienes permisos para realizar esta acción');
                    break;
                case 404:
                    // No encontrado
                    console.error('El recurso solicitado no existe');
                    break;
                case 500:
                    // Error del servidor
                    console.error('Error interno del servidor');
                    break;
                default:
                    console.error('Error en la petición:', error.response.data);
            }
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            console.error('No se recibió respuesta del servidor');
        } else {
            // Error al configurar la petición
            console.error('Error al configurar la petición:', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default httpClient; 