import { UsuarioService } from "../../services/usuarioService.js";
import { TorneoService } from "../../services/torneoService.js";

export async function inscripcionesView() {
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
    const playersContainer = container.querySelector('#players-container');
    const searchInput = container.querySelector('input[placeholder="Buscar participantes..."]');
    const searchButton = container.querySelector('button[type="button"]');
    const tablaBody = container.querySelector('#tabla-inscriptos tbody');
    const btnInscribir = container.querySelector('#btn-inscribir');

    // ID del torneo actual (puede venir de contexto, URL o variable global)
    const torneoId = 4; // <-- MODIFICAR según cómo obtengas el torneo actual

    function actualizarNumeracionYBoton() {
        const filas = tablaBody.querySelectorAll('tr');
        filas.forEach((fila, index) => {
            const celdaNumero = fila.querySelector('td:first-child');
            if (celdaNumero) celdaNumero.textContent = index + 1;
        });

        btnInscribir.disabled = filas.length === 0;
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

            div.querySelector('.bi-person-plus').addEventListener('click', () => {
                const yaExiste = Array.from(tablaBody.children)
                    .some(row => row.dataset.userid === String(user.id));

                if (!yaExiste) {
                    const fila = document.createElement('tr');
                    fila.dataset.userid = user.id;

                    fila.innerHTML = `
                        <td class="text-center"></td>
                        <td class="text-center">${user.name}</td>
                        <td class="text-center">
                            <i class="bi bi-dash-circle text-danger" style="cursor: pointer;"></i>
                        </td>
                    `;

                    fila.querySelector('.bi-dash-circle').addEventListener('click', () => {
                        fila.remove();
                        actualizarNumeracionYBoton();
                    });

                    tablaBody.appendChild(fila);
                    actualizarNumeracionYBoton();
                }
            });

            playersContainer.appendChild(div);
        }
    }

    // Buscar con botón o Enter
    searchButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const texto = searchInput.value.trim();
        await renderUsuarios(texto);
    });

    searchInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const texto = searchInput.value.trim();
            await renderUsuarios(texto);
        }
    });

    // Botón inscribir → Llama al servicio
    btnInscribir.addEventListener('click', async () => {
        const usuariosInscriptos = Array.from(tablaBody.querySelectorAll('tr'))
            .map(row => ({
                usuarioId: parseInt(row.dataset.userid),
                nombre: row.querySelectorAll('td')[1].textContent,
                torneoId: torneoId
            }));

        try {
            await torneoService.inscribirParticipantes(usuariosInscriptos);
            alert("Participantes inscritos correctamente ✅");
            // limpiar tabla si querés
            tablaBody.innerHTML = '';
            actualizarNumeracionYBoton();
        } catch (error) {
            console.error("Error al inscribir:", error);
            alert("❌ Ocurrió un error al inscribir los participantes");
        }
    });

    await renderUsuarios();
    actualizarNumeracionYBoton();

    return container;
}
