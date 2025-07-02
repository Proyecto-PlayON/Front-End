import { TorneoService } from "../../services/torneoService.js";
import { showMessage } from "../../components/showMessages/showMessages.js";
import { mapaComponent } from "../../components/mapa/mapaComponent.js";

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

    let mapaDefecto = await mapaComponent(-34.7750277, -58.267808, "UNAJ, Florencio Varela");
    let mapInstance = null;
    let botonBuscar = container.querySelector(".buscar-ubicacion");
    let input = container.querySelector("#ubicacion"); // te faltaba esta línea
    let mapaTarget = container.querySelector(".mapa-container"); // lugar donde irá el mapa
    mapaTarget.innerHTML = ''; // limpiar contenido previo
    mapaTarget.appendChild(mapaDefecto); // insertar mapa por defecto

    botonBuscar.addEventListener("click", async () => {
        const texto = input.value.trim();
        if (!texto) return showMessage("Escribí una dirección.", "warning");

        const ubicacion = await buscarUbicacion(texto);
        if (!ubicacion) return;

        const { latitud, longitud, nombre } = ubicacion;
        console.log("Ubicación seleccionada:", ubicacion);

        // Cargar nuevo mapa
        const mapa = await mapaComponent(latitud, longitud, nombre);

        // Reemplazar contenido de mapa-container
        mapaTarget.innerHTML = '';        // limpiar contenido anterior
        mapaTarget.appendChild(mapa);     // insertar nuevo mapa
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

        let ubicacionSeleccionada = await buscarUbicacion(ubicacion);


        if (minimoParticipantes < 1 || maximoParticipantes < 1) {
            showMessage("Los valores mínimo y máximo de participantes deben ser al menos 1.", "warning");
            return;
        }
        if (minimoParticipantes >= maximoParticipantes) {
            showMessage("El mínimo de participantes no puede ser mayor o igual al máximo.", "warning");
            return;
        }

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
            latitud: ubicacionSeleccionada.latitud.toString(), 
            longitud: ubicacionSeleccionada.longitud.toString(),
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

async function buscarUbicacion(texto) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(texto)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
      showMessage("No se encontró esa ubicación.", "danger");
      return null;
    }

    const lugar = data[0];
    return {
      latitud: parseFloat(lugar.lat),
      longitud: parseFloat(lugar.lon),
      nombre: lugar.display_name
    };

  } catch (err) {
    console.error(err);
    showMessage("Error buscando ubicación.", "danger");
    return null;
  }
}