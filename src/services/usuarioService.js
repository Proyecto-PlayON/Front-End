import { UsuarioApi } from "../repositories/usuarioApi.js";
import { UsuarioApiFalso } from "../repositories/usuarioApiFalso.js";

export class UsuarioService{

    constructor(){
        //this.repository = new UsuarioApi();
        this.repository = new UsuarioApiFalso();
    }

    async login(json){
        let token = await this.repository.login(json);
        localStorage.setItem('token', token.token);
        let usuarios = await this.repository.getUsersFiltro();
        let user = usuarios.find(u => u.userName === json.userName);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }

    async register(json){
        return await this.repository.register(json);
    }

    async getUsersFiltro(filtro){
        return await this.repository.getUsersFiltro(filtro);
    }
}