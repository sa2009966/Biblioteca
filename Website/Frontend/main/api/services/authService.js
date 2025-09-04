import httpClient from '../httpClient';
import { ENDPOINTS } from '../config';

class AuthService {
    async login(email, password) {
        try {
            const response = await httpClient.post(ENDPOINTS.auth.login, {
                email,
                password
            });
            
            // Guardar el token en localStorage
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
            }
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async register(userData) {
        try {
            const response = await httpClient.post(ENDPOINTS.auth.register, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await httpClient.post(ENDPOINTS.auth.logout);
            // Eliminar el token del localStorage
            localStorage.removeItem('auth_token');
        } catch (error) {
            throw error;
        }
    }

    isAuthenticated() {
        return !!localStorage.getItem('auth_token');
    }
}

export default new AuthService(); 