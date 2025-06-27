import { TorneoApi } from "../repositories/torneoApi.js";

export class TorneoService{
    
    constructor(){
        this.repository = new TorneoApi();
    }

    async inscribirParticipantes(participantes) {

        for(participante in participantes){
            await this.repository.inscribirParticipante(participante);
        }
    }

    async crearTorneo(torneo){
        return await this.repository.crearTorneo(torneo);
    }

    async iniciarTorneo(idTorneo, torneo){
        return await this.repository.iniciarTorneo(idTorneo, torneo);
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