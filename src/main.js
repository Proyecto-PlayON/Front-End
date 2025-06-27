import { MotorApi } from "./repositories/motorApi.js";
import { TorneoApi } from "./repositories/torneoApi.js";
import { UsuarioApi } from "./repositories/usuarioApi.js";
import { UsuarioService } from "./services/usuarioService.js";


let userService = new UsuarioService();

let token = await userService.login(
        {
            "userName": "nicolass",
            "password": "Dfdd2-dds"
        }
);
