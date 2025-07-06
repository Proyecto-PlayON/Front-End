import { TorneoService } from "../../services/torneoService.js";
import { showMessage } from "../../components/showMessages/showMessages.js";

export async function misTorneosView() {
    const container = document.createElement('section');
    container.classList.add('content-mis-torneos-home');

    // Cargar el HTML de la vista
    try {
        const htmlResponse = await fetch('./views/misTorneos/misTorneosView.html');
        const htmlContent = await htmlResponse.text();
        container.innerHTML = htmlContent;
    } catch (error) {
        console.error("Error al cargar HTML de la vista:", error);
        showMessage("Error al cargar la vista de torneos.", "danger");
        return container;
    }


    const contenedor = container.querySelector("#tournament-container");
    contenedor.innerHTML = ""; // limpiamos contenido anterior si hay

    let torneoService = new TorneoService();
    let torneos = [];

    try {
        torneos = await torneoService.getTorneos();

        if (!torneos || torneos.length === 0) {
            showMessage("No tenés torneos creados aún.", "info");
            return container;
        }
    } 
    catch (error) {
        console.error("Error al obtener torneos:", error);
        showMessage("Error al cargar tus torneos.", "danger");
        return container;
    }
    // Ordenar por ID descendente (últimos creados primero)
    torneos.sort((a, b) => b.id - a.id);

    // Tomar solo los últimos 5
    const ultimosTorneos = torneos.slice(0, 5);

    for (let torneo of ultimosTorneos) {

        const div = document.createElement("div");
        div.className = "tournament-card row justify-content-between align-items-center px-4 py-3 my-2 rounded text-white";

        const fechaInicio = new Date(torneo.fechaInicio).toLocaleDateString();
        const fechaFin = new Date(torneo.fechaFinalizacion).toLocaleDateString();

        let icono = "";
        switch ((torneo.estado?.nombre || "").toLowerCase()) {
            case "en espera":
                icono = `<i class="col-1 iconito fa-solid fa-clock"></i>`;
                break;
            case "en proceso":
                icono = `<i class=" iconito fas fa-spinner slow-spin"></i>`;
                break;
            case "terminado":
                icono = `<i id="icono-fin" class="col-1 iconito fa-solid fa-flag-checkered"></i>`;
                break;
        }

        div.innerHTML = `
            <p class=" col-3">${torneo.nombre}</p>
            <p class=" col-3">${torneo.ubicacion}</p>
            <p class=" col-3">${torneo.modalidad?.nombre || 'N/A'}</p>
            <p class=" col-2">${fechaInicio}</p>
            <div class="col-1 iconito"> ${icono}</div>
        `;

        div.addEventListener("click", () => {
                location.hash = `#/torneo?id=${torneo.id}`;
        });


        contenedor.appendChild(div);
    }

    const torneosConGanador = torneos
            .filter(t => t.idGanador && t.nombreGanador)
            .sort((a, b) => new Date(b.fechaFinalizacion) - new Date(a.fechaFinalizacion)) // más recientes primero
            .slice(0, 5); // mostrar solo 5

    const winnersContainer = container.querySelector("#winners-container");

    for (let torneo of torneosConGanador) {
        const winnerDiv = document.createElement("div");
        winnerDiv.className = "winner-card d-flex justify-content-between align-items-center px-4 py-2 my-2 rounded text-white ";

        const fechaFin = new Date(torneo.fechaFinalizacion).toLocaleDateString();

        winnerDiv.innerHTML = `
            <p class="mb-0"><strong>${torneo.nombre}</strong></p>
            <p class="mb-0">🏆 ${torneo.nombreGanador}</p>
            <p class="mb-0">${fechaFin}</p>
        `;

        winnersContainer.appendChild(winnerDiv);
    }

    return container;
}
