const GetTournament = async () => {
    let result = {};
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://localhost:5002/api/Torneo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },


        });

        if (response.ok) {
            const data = await response.json();
            result = { success: true, data }; 
        } else {
            const errorText = await response.text();
            result = { success: false, message: errorText };
        }
    } catch (error) {
        console.error("Error de red: ", error);
        result = { success: false, message: "Error de red o conexión con el servidor." };
    }

    return result;
};

const PostTournament = async (payload) => {
    let result = {};
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://localhost:5002/api/Torneo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const data = await response.json();
            result = { success: true, data };
        } else {
            const errorText = await response.text();
            result = { success: false, message: errorText };
        }
    } catch (error) {
        console.error("Error de red: ", error);
        result = { success: false, message: "Error de red o conexión con el servidor." };
    }

    return result;
};

const TournamentApi = {
    GET: GetTournament,
    POST: PostTournament
}
export default TournamentApi;