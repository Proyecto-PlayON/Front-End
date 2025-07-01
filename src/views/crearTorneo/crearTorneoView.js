import { TorneoService } from "../../services/torneoService.js";
import { showMessage } from "../../components/showMessages/showMessages.js";

export async function crearTorneoView() {
    const container = document.createElement('section');
    container.classList.add('content');

    // Cargar el HTML
    const htmlResponse = await fetch('./views/crearTorneo/crearTorneoView.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;

    const modalidadSelect = container.querySelector('#modalidad');
    const permitirEmpatesCheckbox = container.querySelector('#permitirEmpates');
    let puntosEmpate = container.querySelector('#puntosPorEmpate');

    permitirEmpatesCheckbox.addEventListener('change', () => {
        // Si se desactiva el checkbox, desactivar el checkbox de permitir empates
        if (!permitirEmpatesCheckbox.checked) {
            puntosEmpate.disabled = true;
            puntosEmpate.value = '0';
        }
        else {
            puntosEmpate.disabled = false;
            puntosEmpate.value = '1'; // Valor por defecto si se activa
        }
    });

    // Evento que desactiva o activa el checkbox según la modalidad
    modalidadSelect.addEventListener('change', () => {
        const esEliminacion = modalidadSelect.value === 'eliminacion';

        permitirEmpatesCheckbox.checked = false;
        permitirEmpatesCheckbox.disabled = esEliminacion;

        // Referencias a los inputs de puntos
        const puntosPorVictoriaInput = container.querySelector('#puntosPorVictoria');
        const puntosPorEmpateInput = container.querySelector('#puntosPorEmpate');
        const puntosPorDerrotaInput = container.querySelector('#puntosPorDerrota');

        if (esEliminacion) {
            puntosPorVictoriaInput.value = '3';
            puntosPorEmpateInput.value = '0';
            puntosPorDerrotaInput.value = '0';

            puntosPorVictoriaInput.disabled = true;
            puntosPorEmpateInput.disabled = true;
            puntosPorDerrotaInput.disabled = true;
        } else {
            puntosPorVictoriaInput.disabled = false;
            puntosPorEmpateInput.disabled = false;
            puntosPorDerrotaInput.disabled = false;

            puntosPorVictoriaInput.value = '3';
            puntosPorEmpateInput.value = '1';
            puntosPorDerrotaInput.value = '0';
            permitirEmpatesCheckbox.checked = true;
        }
    });


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
            let torneoCreado = await torneoService.crearTorneo(torneo);
            showMessage("Torneo creado con éxito!!", "success");
            location.hash = `#/inscripciones?id=${torneoCreado.id}`;

            // redirigir o limpiar formulario si querés
        } catch (error) {
            console.error("Error al crear torneo:", error);
            showMessage("Error al crear torneo...", "danger");
        }
    });

    return container;
}
