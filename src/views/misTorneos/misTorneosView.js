import { TorneoService } from "../../services/torneoService.js";
import { showMessage } from "../../components/showMessages/showMessages.js";

export async function misTorneosView() {
    const container = document.createElement('section');
    container.classList.add('content');

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

    for (let torneo of torneos) {
        const div = document.createElement("div");
        div.className = "tournament-card d-flex justify-content-between align-items-center px-4 py-3 my-2 rounded text-white";

        const fechaInicio = new Date(torneo.fechaInicio).toLocaleDateString();
        const fechaFin = new Date(torneo.fechaFinalizacion).toLocaleDateString();

        let estadoClass = "";
        switch ((torneo.estado?.nombre || "").toLowerCase()) {
            case "en espera":
                estadoClass = "estado-en-espera";
                break;
            case "en proceso":
                estadoClass = "estado-en-proceso";
                break;
            case "terminado":
                estadoClass = "estado-terminado";
                break;
        }

        div.innerHTML = `
            <p class="mb-0">${torneo.nombre}</p>
            <p class="mb-0">${torneo.ubicacion}</p>
            <p class="mb-0">${torneo.modalidad?.nombre || 'N/A'}</p>
            <p class="mb-0">${fechaInicio} - ${fechaFin}</p>
            <p class="mb-0 ${estadoClass}">${torneo.estado?.nombre || 'N/A'}</p>
            <p class="mb-0 d-flex gap-2">
                <button class="btn btn-sm btn-primary inscripciones-btn">Inscripciones</button>
                <button class="btn btn-sm btn-light ver-btn">Ver</button>
            </p>
        `;

        const btnInscripciones = div.querySelector(".inscripciones-btn");
        const btnVer = div.querySelector(".ver-btn");

        // Deshabilitar botones según estado
        if (torneo.estado.id === 1) btnVer.disabled = true; // en espera
        if (torneo.estado.id === 2 || torneo.estado.id === 3) btnInscripciones.disabled = true; // en proceso o terminado

        btnInscripciones.addEventListener("click", () => {
            location.hash = `#/inscripciones?id=${torneo.id}`;
        });

        btnVer.addEventListener("click", () => {
            location.hash = `#/torneo?id=${torneo.id}`;
        });

        contenedor.appendChild(div);
    }

    return container;
}
