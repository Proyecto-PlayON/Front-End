const URL_USUARIOS = 'https://localhost:7282/api/';
const URL_TORNEOS = 'https://localhost:5002/api/';
const URL_MOTOR = 'https://localhost:7500/api/';

export const API_USUARIOS = {
    URI_LOGIN: URL_USUARIOS + 'Login',
    URI_REGISTER: URL_USUARIOS + 'Register',
    URI_USERS: URL_USUARIOS + 'Users',
    URI_FILTER: URL_USUARIOS + 'Users/Filter',
    URI_FILTER_PAGINADO: URL_USUARIOS + 'Users/FilterPaginado',
};

export const API_TORNEOS = {
    URI_INSCRIPCION: URL_TORNEOS + 'Inscripcion',
    URI_TORNEO: URL_TORNEOS + 'Torneo',
    URI_INICIAR_MOTOR: URL_TORNEOS + 'Torneo/iniciarMotor',
};
    
export const API_MOTOR = {
    URI_ACTUALIZAR_PARTIDO: URL_MOTOR + 'actualizar-partido',
    URI_PARTIDO: URL_MOTOR + 'Partido',
    URI_PARTIDO_TORNEO: URL_MOTOR + 'Partido/torneo',
    URI_PARTIDO_USUARIO: URL_MOTOR + 'Partido/usuario',
    URI_RANKING: URL_MOTOR + 'Ranking'
};