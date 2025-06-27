import { TorneoService } from "../../services/torneoService.js";

export async function crearTorneoView() {
    const container = document.createElement('section');
    container.classList.add('content');

    // Cargar el HTML
    const htmlResponse = await fetch('./views/crearTorneo/crearTorneoView.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;

    // Cargar el CSS si no está cargado
    const cssHref = './views/crearTorneo/crearTorneoView.css';
    if (!document.querySelector(`link[href="${cssHref}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssHref;
        document.head.appendChild(link);
    }

    const form = container.querySelector('#tournamentForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Capturar los valores del formulario
        const nombre = container.querySelector('#nombre').value;
        const ubicacion = container.querySelector('#ubicacion').value;
        const fechaInicio = container.querySelector('#fechaInicio').value;
        const modalidad = container.querySelector('#modalidad').value;
        const minimoParticipantes = container.querySelector('#minimoParticipantes').value;
        const maximoParticipantes = container.querySelector('#maximoParticipantes').value;
        const puntosPorVictoria = container.querySelector('#puntosPorVictoria').value;
        const puntosPorEmpate = container.querySelector('#puntosPorEmpate').value;
        const puntosPorDerrota = container.querySelector('#puntosPorDerrota').value;
        const permitirEmpates = container.querySelector('#permitirEmpates').checked;

        // Mapear modalidad a un ID (reemplazalo si es necesario)
        let modalidadId;
        if (modalidad === 'eliminacion') modalidadId = '1';
        else if (modalidad === 'puntos') modalidadId = '2';
        else modalidadId = '';

        const usuario = JSON.parse(localStorage.getItem('user'));
        const usuarioOrganizadorId = String(usuario?.id || "");

        const torneo = {
            nombre,
            usuarioOrganizadorId,
            ubicacion,
            latitud: "0", // Podés dejar fijo o agregar campos si querés capturarlo después
            longitud: "0",
            minimoParticipantes,
            maximoParticipantes,
            fechaInicio,
            modalidadId,
            permitirEmpates,
            puntosPorVictoria,
            puntosPorEmpate,
            puntosPorDerrota
        };

        // Crear torneo
        const torneoService = new TorneoService();
        try {
            await torneoService.crearTorneo(torneo);
            alert("Torneo creado con éxito");
            // redirigir o limpiar formulario si querés
        } catch (error) {
            console.error("Error al crear torneo:", error);
            alert("Error al crear torneo");
        }
    });

    return container;
}
