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
            alert('El partido fue actualizado con éxito');
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Error de conexión con el servidor');
            return null;
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
            alert(error.message || 'Error de conexión con el servidor');
            return null;
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
            alert(error.message || 'Error de conexión con el servidor');
            return null;
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
            alert(error.message || 'Error de conexión con el servidor');
            return null;
        }
    }

    async getRankingByIdTorneo(idTorneo) {
         try {
            const url = `${this.URL.URI_RANKING}/${idTorneo}`;
            const data = await fetchConToken(url);
            return data;
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Error de conexión con el servidor');
            return null;
        }
    }

}