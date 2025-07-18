import { TorneoService } from "../../services/torneoService.js";
import { showMessage } from "../../components/showMessages/showMessages.js";

export async function homeView() {
    const container = document.createElement('section');
    container.classList.add('content-mis-torneos-home');

    try {
        const htmlResponse = await fetch('./views/home/homeView.html');
        const htmlContent = await htmlResponse.text();
        container.innerHTML = htmlContent;
    } catch (error) {
        console.error("Error al cargar HTML de la vista:", error);
        showMessage("Error al cargar la vista de torneos.", "danger");
        return container;
    }


    const contenedor = container.querySelector("#tournament-container");
    contenedor.innerHTML = ""; 
    const winnersContainer = container.querySelector("#winners-container");
    winnersContainer.innerHTML = "";

    let torneoService = new TorneoService();
    let torneos = [];

    try {
        torneos = await torneoService.getTorneos();
    } 
    catch (error) {
        console.error("Error al obtener torneos:", error);
        showMessage("Error al cargar tus torneos.", "danger");
        return container;
    }
    if (!torneos || torneos.length === 0) {
        contenedor.innerHTML = `<p class="text-center text-white my-3">No hay torneos creados aún.</p>`;
    } else {
        torneos.sort((a, b) => b.id - a.id);
        const ultimosTorneos = torneos.slice(0, 5);

        for (let torneo of ultimosTorneos) {
            const div = document.createElement("div");
            div.className = "tournament-card row justify-content-between align-items-center px-4 py-3 my-2 rounded text-white";

            const fechaInicio = new Date(torneo.fechaInicio).toLocaleDateString();

            let icono = "";
            switch ((torneo.estado?.nombre || "").toLowerCase()) {
                case "en espera":
                    icono = `<i class="col-1 iconito fa-solid fa-clock"></i>`;
                    break;
                case "en proceso":
                    icono = `<i class="iconito fas fa-spinner slow-spin"></i>`;
                    break;
                case "terminado":
                    icono = `<i id="icono-fin" class="col-1 iconito fa-solid fa-flag-checkered"></i>`;
                    break;
            }

            div.innerHTML = `
                <p class="col-3">${torneo.nombre}</p>
                <p class="col-3">${torneo.ubicacion}</p>
                <p class="col-3">${torneo.modalidad?.nombre || 'N/A'}</p>
                <p class="col-2">${fechaInicio}</p>
                <div class="col-1 iconito">${icono}</div>
            `;

            div.addEventListener("click", () => {
                location.hash = `#/torneo?id=${torneo.id}`;
            });

            contenedor.appendChild(div);
        }
    }

    const torneosConGanador = torneos
            .filter(t => t.idGanador && t.nombreGanador)
            .sort((a, b) => new Date(b.fechaFinalizacion) - new Date(a.fechaFinalizacion)) 
            .slice(0, 5); 

    if (torneosConGanador.length === 0) {
        winnersContainer.innerHTML = `<div class="text-center text-white my-3">No hay ganadores registrados aún.</div>`;
    } else {
        for (let torneo of torneosConGanador) {
            const winnerDiv = document.createElement("div");
            winnerDiv.className = "winner-card d-flex justify-content-between align-items-center px-4 py-2 my-2 rounded text-white";

            const fechaFin = new Date(torneo.fechaFinalizacion).toLocaleDateString();

            winnerDiv.innerHTML = `
                <p class="mb-0 col-4"><strong>${torneo.nombre}</strong></p>
                <p class="mb-0 col-4">🏆 ${torneo.nombreGanador}</p>
                <p class="mb-0 col-4">${fechaFin}</p>
            `;

            winnersContainer.appendChild(winnerDiv);
        }
    }


    return container;
}
