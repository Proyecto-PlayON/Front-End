import { API_TORNEOS } from "../config/Enviroments.js";
import { fetchConToken } from "./utils.js";

export class TorneoApi{

    constructor() { 
        this.URL = API_TORNEOS;
    }

    async inscribir(participante) {
        try {
            const data = await fetchConToken(this.URL.URI_INSCRIPCION, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(participante)
            });
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async eliminarInscripcion(idInscripcion) {
        try {
            const data = await fetchConToken(`${this.URL.URI_INSCRIPCION}/${idInscripcion}`, {
                method: 'DELETE'
            });
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async crearTorneo(torneo) {
        try {
            const data = await fetchConToken(this.URL.URI_TORNEO, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(torneo)
            });
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async iniciarTorneo(idTorneo) {
        try {
            const url = `${this.URL.URI_INICIAR_MOTOR}/${idTorneo}`;
            const data = await fetchConToken(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify()
            });
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getTorneos() {
        try {
            const data = await fetchConToken(this.URL.URI_TORNEO);
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getTorneoById(id) {
        try {
            const url = `${this.URL.URI_TORNEO}/${id}`;
            const data = await fetchConToken(url);
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async actualizarTorneo(id, torneo) {
        try {
            const url = `${this.URL.URI_TORNEO}/${id}`;
            const data = await fetchConToken(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(torneo) 
            });
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}