import { MotorApi } from "../repositories/motorApi.js";

export class MotorService{

    constructor(){
        this.repository = new MotorApi();
    }

    async actualizarPartido(id, json){
        return await this.repository.actualizarPartido(id, json);
    }

    async getPartidoById(id){
        return await this.repository.getPartidoById(id);
    }

    async getPartidosByIdTorneo(idTorneo){
        return await this.repository.getPartidosByIdTorneo(idTorneo);
    }

    async getPartidosByIdUsuario(idUsuario){
        return await this.repository.getPartidosByIdUsuario(idUsuario);
    }

    async getRankingByIdTorneo(idTorneo){
        return await this.repository.getRankingByIdTorneo(idTorneo);
    }
}