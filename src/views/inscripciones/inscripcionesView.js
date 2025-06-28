import { UsuarioService } from "../../services/usuarioService.js";
import { TorneoService } from "../../services/torneoService.js";

export async function inscripcionesView() {
    const params = new URLSearchParams(location.hash.split('?')[1]);
    const torneoId = params.get('id');

    if (!torneoId) {
        const div = document.createElement('div');
        div.innerHTML = `<p class="text-white">No se proporcionó un ID de torneo.</p>`;
        return div;
    }


    const container = document.createElement('section');
    container.classList.add('content');

    // Cargar HTML y CSS
    const htmlResponse = await fetch('./views/inscripciones/inscripcionesView.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;

    const cssHref = './views/inscripciones/inscripcionesView.css';
    if (!document.querySelector(`link[href="${cssHref}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssHref;
        document.head.appendChild(link);
    }

    // Instancias y elementos
    const usuarioService = new UsuarioService();
    const torneoService = new TorneoService();
    const torneo = await torneoService.getTorneoById(torneoId);
    
    const playersContainer = container.querySelector('#players-container');
    const searchInput = container.querySelector('input[placeholder="Buscar participantes..."]');
    const searchButton = container.querySelector('button[type="button"]');
    const tablaBody = container.querySelector('#tabla-inscriptos tbody');
    const btnIniciar = container.querySelector('#btn-inscribir');


    const contenedorInfo = document.createElement('div');
    contenedorInfo.className = 'torneo-info  p-3 rounded';
    contenedorInfo.innerHTML = `
        <h4 class="text-center">Información del Torneo</h4>
        <p><strong>Nombre:</strong> ${torneo.nombre}</p>
        <p><strong>Ubicación:</strong> ${torneo.ubicacion}</p>
        <p><strong>Participantes:</strong> ${torneo.inscripciones.length} / ${torneo.maximoParticipantes}</p>
        <p><strong>Estado:</strong> ${torneo.estado.nombre}</p>
        <p><strong>Modalidad:</strong> ${torneo.modalidad.nombre}</p>
        <p><strong>Inicio:</strong> ${new Date(torneo.fechaInicio).toLocaleDateString()}</p>
    `;
    // Insertar info del torneo entre los dos bloques
    const containerFlex = container.querySelector('.inscription-content');
    containerFlex.insertBefore(contenedorInfo, container.querySelector('#botton-window'));

    function actualizarNumeracion() {
        const filas = tablaBody.querySelectorAll('tr');
        filas.forEach((fila, index) => {
            const celdaNumero = fila.querySelector('td:first-child');
            if (celdaNumero) celdaNumero.textContent = index + 1;
        });
    }

    async function cargarInscriptosDesdeTorneo() {
        const torneoActualizado = await torneoService.getTorneoById(torneoId);
        tablaBody.innerHTML = '';

        for (const insc of torneoActualizado.inscripciones) {
            const fila = document.createElement('tr');
            fila.dataset.userid = insc.usuarioId;
            fila.dataset.inscripcionid = insc.id;

            fila.innerHTML = `
                <td class="text-center"></td>
                <td class="text-center">${insc.nombre}</td>
                <td class="text-center">
                    <i class="bi bi-dash-circle text-danger" style="cursor: pointer;"></i>
                </td>
            `;

            fila.querySelector('.bi-dash-circle').addEventListener('click', async () => {
                await torneoService.eliminarInscripcion(insc.id);
                await cargarInscriptosDesdeTorneo();
            });

            tablaBody.appendChild(fila);
        }

        actualizarNumeracion();
        btnIniciar.disabled = torneoActualizado.inscripciones.length === 0;
    }

    async function renderUsuarios(filtro = "") {
        const users = await usuarioService.getUsersFiltro(filtro);
        playersContainer.innerHTML = '';

        for (let user of users) {
            const div = document.createElement('div');
            div.className = 'players-card d-flex justify-content-between align-items-center px-4 py-3 my-2 rounded text-white';

            div.innerHTML = `
                <i class="bi bi-star"></i>
                <p>${user.name}</p>
                <i class="bi bi-person-plus" style="cursor: pointer;"></i>
            `;

            div.querySelector('.bi-person-plus').addEventListener('click', async () => {
                const payload = {
                    usuarioId: user.id,
                    nombre: user.name,
                    torneoId: torneoId
                };
                await torneoService.inscribir(payload);
                await cargarInscriptosDesdeTorneo();
            });

            playersContainer.appendChild(div);
        }
    }

    searchButton.addEventListener('click', async (e) => {
        e.preventDefault();
        await renderUsuarios(searchInput.value.trim());
    });

    searchInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            await renderUsuarios(searchInput.value.trim());
        }
    });

    btnIniciar.textContent = "Iniciar Torneo";
    btnIniciar.addEventListener('click', async () => {
        await torneoService.iniciarTorneo(torneoId);
        alert("Torneo iniciado ✅");
        location.hash = `#/torneo?id=${torneoId}`;
    });

    await renderUsuarios();
    await cargarInscriptosDesdeTorneo();

    return container;
}
