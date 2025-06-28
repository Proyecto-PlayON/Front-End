import { API_MOTOR } from "../config/Enviroments.js";
import { fetchConToken } from "./utils.js";

export class MotorApi{

    constructor() { 
        this.URL = API_MOTOR;
    }

    async actualizarPartido(id, json) {
        const url = `${this.URL.URI_ACTUALIZAR_PARTIDO}/${id}`;
        try {
            const data = await fetchConToken(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            });
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getPartidoById(id) {
        try {
            const url = `${this.URL.URI_PARTIDO}/${id}`;
            const data = await fetchConToken(url); 
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }


    async getPartidosByIdTorneo(idTorneo) {
        try {
            const url = `${this.URL.URI_PARTIDO_TORNEO}/${idTorneo}`;
            const data = await fetchConToken(url);
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getPartidosByIdUsuario(idUsuario) {
         try {
            const url = `${this.URL.URI_PARTIDO_USUARIO}/${idUsuario}`;
            const data = await fetchConToken(url);
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getRankingByIdTorneo(idTorneo) {
         try {
            const url = `${this.URL.URI_RANKING}/${idTorneo}`;
            const data = await fetchConToken(url);
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

}