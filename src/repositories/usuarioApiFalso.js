// simulacion de una API de usuario para pruebas
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
            id: 1,
            userName: "riverplate",
            name: "Club Atlético River Plate",
            email: "river@futbol.com"
        },
        {
            id: 2,
            userName: "bocajuniors",
            name: "Club Atlético Boca Juniors",
            email: "boca@futbol.com"
        },
        {
            id: 3,
            userName: "independienteok",
            name: "Club Atlético Independiente",
            email: "independiente@futbol.com"
        },
        {
            id: 4,
            userName: "sanlorenzo1908",
            name: "San Lorenzo de Almagro",
            email: "sanlorenzo@futbol.com"
        },
        {
            id: 5,
            userName: "racingclub",
            name: "Racing Club",
            email: "racing@futbol.com"
        },
        {
            id: 6,
            userName: "huracanoficial",
            name: "Club Atlético Huracán",
            email: "huracan@futbol.com"
        },
        {
            id: 7,
            userName: "velezsarsfield",
            name: "Club Atlético Vélez Sarsfield",
            email: "velez@futbol.com"
        },
        {
            id: 8,
            userName: "argentinosjrs",
            name: "Argentinos Juniors",
            email: "argentinos@futbol.com"
        },
        {
            id: 9,
            userName: "rosariocentral",
            name: "Rosario Central",
            email: "rosario@futbol.com"
        },
        {
            id: 10,
            userName: "newellsoldboys",
            name: "Newell's Old Boys",
            email: "newells@futbol.com"
        },
        {
            id: 11,
            userName: "lanusgrana",
            name: "Club Atlético Lanús",
            email: "lanus@futbol.com"
        },
        {
            id: 12,
            userName: "banfieldverde",
            name: "Club Atlético Banfield",
            email: "banfield@futbol.com"
        },
        {
            id: 13,
            userName: "tallerescba",
            name: "Talleres de Córdoba",
            email: "talleres@futbol.com"
        },
        {
            id: 14,
            userName: "estudianteslp",
            name: "Estudiantes de La Plata",
            email: "estudiantes@futbol.com"
        },
        {
            id: 15,
            userName: "gimnasialp",
            name: "Gimnasia y Esgrima La Plata",
            email: "gimnasia@futbol.com"
        },
        {
            id: 16,
            userName: "colonstaafe",
            name: "Colón de Santa Fe",
            email: "colon@futbol.com"
        },
        {
            id: 17,
            userName: "unionstaafe",
            name: "Unión de Santa Fe",
            email: "union@futbol.com"
        },
        {
            id: 18,
            userName: "defensayjusticia",
            name: "Defensa y Justicia",
            email: "defensa@futbol.com"
        },
        {
            id: 19,
            userName: "platenseok",
            name: "Club Atlético Platense",
            email: "platense@futbol.com"
        },
        {
            id: 20,
            userName: "arsenalSarandi",
            name: "Arsenal de Sarandí",
            email: "arsenal@futbol.com"
        }
        ]
    }
}
