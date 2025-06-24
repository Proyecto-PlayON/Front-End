import loadTournaments from "../components/renderTournament.js";



const render = async () => {

   loadTournaments();
    document.getElementById("createTournamentBtn").addEventListener("click", () => {
    window.location.href = "createTournament.html";
    });
}

window.onload = render;