export class UsuarioApiFalso {
    
    constructor() {
        this.URL = {
            URI_LOGIN: '/api/fake-login',
            URI_REGISTER: '/api/fake-register',
            URI_FILTER: '/api/fake-filter'
        };
    }

    async login(json) {
        console.log("Login simulado con:", json);
        return {
            token: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4IiwibmJmIjoxNzUxMDY4NjcxLCJleHAiOjE3NTE5MzI2NzEsImlhdCI6MTc1MTA2ODY3MX0.ZmIpUqq7SwFZJOIT-lXc9kKi7mupZdTYnf_UCgkLyV6ZzzJDk2YGwRm5ASxGZeSqY8QpL0hbGrmIqm703oxfWg"
        };
    }

    async register(json) {
        console.log("Registro simulado con:", json);
        return {
            message: "Usuario Registrado Exitosamente."
        };
    }

    async getUsersFiltro(filtro) {
        console.log("Filtro simulado:", filtro);
        return [
            {
                id: 7,
                userName: "nico54",
                name: "nicolas monasterio",
                email: "carlos@gmail.com"
            },
            {
                id: 8,
                userName: "nico65",
                name: "nicolas ochoa",
                email: "nicoda@gmail.com"
            },
            {
                id: 3,
                userName: "nico",
                name: "nicolas ochoa",
                email: "nicodyj01@gmail.com"
            },
            {
                id: 9,
                userName: "nicolass",
                name: "nuicola",
                email: "nico@gmail.com"
            }
        ];
    }
}
