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
            alert('La inscripción fue creada con éxito');
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Error de conexión con el servidor');
            return null;
        }
    }

    async eliminarInscripcion(idInscripcion) {
        try {
            const data = await fetchConToken(`${this.URL.URI_INSCRIPCION}/${idInscripcion}`, {
                method: 'DELETE'
            });

            alert('La inscripción fue eliminada con éxito');
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Error de conexión con el servidor');
            return null;
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
            alert('El torneo fue creado con éxito');
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Error de conexión con el servidor');
            return null;
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
            alert('El torneo fue iniciado con éxito');
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Error de conexión con el servidor');
            return null;
        }
    }

    async getTorneos() {
        try {
            const data = await fetchConToken(this.URL.URI_TORNEO);
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Error de conexión con el servidor');
            return null;
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
            alert(error.message || 'Error de conexión con el servidor');
            return null;
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
            alert('El torneo fue actualizado con éxito');
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Error de conexión con el servidor');
            return null;
        }
    }
}