import { UsuarioService } from "../../services/usuarioService.js";
import { TorneoService } from "../../services/torneoService.js";
import { showMessage } from "../../components/showMessages/showMessages.js";
import { router } from "../../router.js";

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

    const htmlResponse = await fetch('./views/inscripciones/inscripcionesView.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;


    const usuarioService = new UsuarioService();
    const torneoService = new TorneoService();

    let torneo;
    try {
        torneo = await torneoService.getTorneoById(torneoId);
    } catch (error) {
        showMessage("Error al cargar los datos del torneo", "danger");
        console.error(error);
        return container;
    }

    const playersContainer = container.querySelector('#players-container');
    const searchInput = container.querySelector('input[placeholder="Buscar participantes..."]');
    const searchButton = container.querySelector('button[type="button"]');
    const tablaBody = container.querySelector('#tabla-inscriptos tbody');
    const btnIniciar = container.querySelector('#btn-inscribir');

    
    function actualizarNumeracion() {
        const filas = tablaBody.querySelectorAll('tr');
        filas.forEach((fila, index) => {
            const celdaNumero = fila.querySelector('td:first-child');
            if (celdaNumero) celdaNumero.textContent = index + 1;
        });
    }

    async function cargarInscriptosDesdeTorneo() {
        try {
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
                    try {
                        await torneoService.eliminarInscripcion(insc.id);
                        await cargarInscriptosDesdeTorneo();
                        showMessage("Participante eliminado", "info");
                    } catch (error) {
                        console.error(error);
                        showMessage("Error al eliminar inscripción", "danger");
                    }
                });

                tablaBody.appendChild(fila);
            }

            actualizarNumeracion();
            btnIniciar.disabled = torneoActualizado.inscripciones.length === 0;
        } catch (error) {
            console.error(error);
            showMessage("Error al cargar inscriptos", "danger");
        }
    }

    async function renderUsuarios(filtro = "") {
        try {
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

                    try {
                        await torneoService.inscribir(payload);
                        await cargarInscriptosDesdeTorneo();
                        showMessage(`${user.name} inscrito correctamente`, "success");
                    } catch (error) {
                        console.error(error);
                        showMessage("Error al inscribir participante", "danger");
                    }
                });

                playersContainer.appendChild(div);
            }
        } catch (error) {
            console.error(error);
            showMessage("Error al buscar usuarios", "danger");
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
        try {
            await torneoService.iniciarTorneo(torneoId);
            showMessage("Torneo iniciado ✅", "success");
            location.hash = `#/torneo?id=${torneoId}`;
            router(); // Actualizar la vista
        } catch (error) {
            console.error(error);
            showMessage("Error al iniciar el torneo", "danger");
        }
    });

    // Carga inicial
    await renderUsuarios();
    await cargarInscriptosDesdeTorneo();

    return container;
}
