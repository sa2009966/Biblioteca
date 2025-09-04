import httpClient from '../httpClient';
import { ENDPOINTS } from '../config';

class ContactService {
    async sendMessage(contactData) {
        try {
            const response = await httpClient.post(ENDPOINTS.contact.send, contactData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new ContactService(); 