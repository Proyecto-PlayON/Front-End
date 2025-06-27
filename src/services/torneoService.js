import { TorneoApi } from "../repositories/torneoApi.js";

export class TorneoService{
    
    constructor(){
        this.repository = new TorneoApi();
    }

    async inscribir(participante) {
        return await this.repository.inscribir(participante);   
    }

    async eliminarInscripcion(idIncripicion) {
        return await this.repository.eliminarInscripcion(idIncripicion);   
    }

    async crearTorneo(torneo){
        return await this.repository.crearTorneo(torneo);
    }

    async iniciarTorneo(idTorneo){
        return await this.repository.iniciarTorneo(idTorneo);
    }

    async getTorneos(){
        return await this.repository.getTorneos();
    }

    async getTorneoById(id){
        return await this.repository.getTorneoById(id);
    }

    async actualizarTorneo(id, torneo){
        return await this.repository.actualizarTorneo(id, torneo);
    }
}