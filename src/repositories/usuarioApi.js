import { API_USUARIOS } from "../config/Enviroments.js";
import { fetchConToken } from "./utils.js";

export class UsuarioApi{

    constructor() { 
        this.URL = API_USUARIOS;
    }

    async login(json) {
        try {
            const response = await fetch(this.URL.URI_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            });

            const contentType = response.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } 
            else {
                const text = await response.text();
                throw new Error(text);
            }

            if (!response.ok) {
                throw new Error(data.message || 'Ocurrió un error inesperado');
            }
            return data;
        } 
        catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }

    async register(json) {
        try {
            const response = await fetch(this.URL.URI_REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            });

            const contentType = response.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } 
            else {
                const text = await response.text();
                throw new Error(text);
            }

            if (!response.ok) {
                throw new Error(data.message || 'Ocurrió un error inesperado');
            }
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getUsersFiltro(filtro) {
        const params = new URLSearchParams();

        if (filtro) params.append('filter', filtro);

        const queryString = params.toString();
        const url = `${this.URL.URI_FILTER}?${queryString}`;

        try {
            const data = await fetchConToken(url);
            return data;
        }
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}