import { TorneoService } from "../../services/torneoService.js";

export async function misTorneosView(){
    const container = document.createElement('section');
    container.classList.add('content');

    // Cargar el HTML de la página
    const htmlResponse = await fetch('./views/misTorneos/misTorneosView.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;

    // Cargar y aplicar el CSS solo si no se ha cargado antes
    const cssHref = './views/misTorneos/misTorneosView.css';
    if (!document.querySelector(`link[href="${cssHref}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssHref;
        document.head.appendChild(link);
    }

    let torneoService = new TorneoService();
    let torneos = await torneoService.getTorneos();

    const contenedor = container.querySelector("#tournament-container");
    contenedor.innerHTML = ""; // limpio por si hay contenido previo

    torneos.forEach(torneo => {
        const div = document.createElement("div");
        div.className = "tournament-card d-flex justify-content-between align-items-center px-4 py-3 my-2 rounded text-white";

        // Formateo fechas
        const fechaInicio = new Date(torneo.fechaInicio).toLocaleDateString();
        const fechaFin = new Date(torneo.fechaFinalizacion).toLocaleDateString();

        // Clase CSS según estado
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
            default:
                estadoClass = ""; // sin clase o default
        }


         div.innerHTML = `
            <p class="mb-0">${torneo.nombre}</p>
            <p class="mb-0">${torneo.ubicacion}</p>
            <p class="mb-0">${torneo.modalidad?.nombre || 'N/A'}</p>
            <p class="mb-0">${fechaInicio} - ${fechaFin}</p>
            <p class="mb-0 ${estadoClass}">${torneo.estado?.nombre || 'N/A'}</p>
            <p class="mb-0">
                <button class="btn btn-sm btn-light">Ver</button>
            </p>
        `;

        contenedor.appendChild(div);
    });


    return container;
} 