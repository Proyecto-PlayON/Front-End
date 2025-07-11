import { showMessage } from "../components/showMessages/showMessages.js";

export async function fetchConToken(url, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await fetch(url, { ...options, headers });

        if (response.status === 204) {
            return null; 
        }

        const contentType = response.headers.get('content-type');

        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            
            if (!response.ok) {
                throw new Error(text || 'Ocurrió un error inesperado');
            }
            return text;
        }

        if (!response.ok) {
            if (response.status === 401) {
                showMessage('Sesión expirada. Volvé a iniciar sesión.', 'danger');
                location.hash = '#/welcome';
                return null;
            }
            throw new Error(data.message || 'Ocurrió un error inesperado');
        }

        return data;

    } catch (error) {
        console.error('fetchConToken Error:', error);
        throw error;
    }
}
