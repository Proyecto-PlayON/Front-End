import { MotorService } from "../../services/motorService.js";
import { showMessage } from "../showMessages/showMessages.js";
import { router } from "../../router.js";

export async function mostrarModalPartido(partido, torneo, numeroRondas) {
  const container = document.createElement('section');
  container.classList.add('content');

  const htmlResponse = await fetch('./components/partidoModal/partidoModalComponent.html');
  const htmlContent = await htmlResponse.text();
  container.innerHTML = htmlContent;

  document.body.appendChild(container);

  const modalElement = container.querySelector('#partidoModal');

  // Título del modal con nombre del torneo
  container.querySelector('#partidoModalLabel').textContent = torneo.nombre;

  // Participantes
  container.querySelector('#usuario1Nombre').textContent = partido.usuario1Nombre;
  container.querySelector('#usuario2Nombre').textContent = partido.usuario2Nombre;
  container.querySelector('#nombreEquipo1').textContent = partido.usuario1Nombre;
  container.querySelector('#nombreEquipo2').textContent = partido.usuario2Nombre;

  // Inputs de resultado
  const inputResultado1 = container.querySelector('#inputResultado1');
  const inputResultado2 = container.querySelector('#inputResultado2');

  const btnActualizar = container.querySelector('#btnActualizarResultado');
  btnActualizar.disabled = true;

  // Habilitar el botón solo si ambos inputs son válidos
  function verificarInputs() {
    const r1 = inputResultado1.value;
    const r2 = inputResultado2.value;
    btnActualizar.disabled = !(r1 !== '' && r2 !== '' && !isNaN(r1) && !isNaN(r2));
  }

  // Si el partido ya no está en estado "Pendiente", deshabilitar inputs y ocultar botón
  if (partido.estadoId !== 1) {
    inputResultado1.disabled = true;
    inputResultado2.disabled = true;
    btnActualizar.classList.add('d-none'); // Oculta el botón
  }

  inputResultado1.addEventListener('input', verificarInputs);
  inputResultado2.addEventListener('input', verificarInputs);

  if (partido.resultadoUsuario1 !== null) inputResultado1.value = partido.resultadoUsuario1;
  if (partido.resultadoUsuario2 !== null) inputResultado2.value = partido.resultadoUsuario2;
  verificarInputs(); // Por si ya vienen cargados

  // Fecha y estado
  let fechaText = 'Sin definir';
  let fechaCentralText = 'Sin definir';
  let dia = '', mes = '', hora = '', minutos = '';

  if (partido.fecha) {
    const fecha = new Date(partido.fecha);

    if (!isNaN(fecha)) { // Verifica que sea una fecha válida
      dia = String(fecha.getDate()).padStart(2, '0');
      mes = String(fecha.getMonth() + 1).padStart(2, '0');
      hora = String(fecha.getHours()).padStart(2, '0');
      minutos = String(fecha.getMinutes()).padStart(2, '0');
      fechaText = `${dia}/${mes} ${hora}:${minutos}`;
      fechaCentralText = `${dia}/${mes}`;
    }
  }


  container.querySelector('#fecha').textContent = fechaText;
  container.querySelector('#fechaCentral').textContent = fechaCentralText;
  container.querySelector('#estado').textContent = partido.estadoId === 1 ? 'Pendiente' : 'Finalizado';

  // Ronda
  let textoRonda = '';
  if (torneo.modalidad.id === 2) {
    textoRonda = `Ronda ${partido.ronda}`;
  } else {
    const diferencia = numeroRondas - partido.ronda;
    switch (diferencia) {
      case 0: textoRonda = 'Final'; break;
      case 1: textoRonda = 'Semifinal'; break;
      case 2: textoRonda = 'Cuartos de final'; break;
      case 3: textoRonda = 'Octavos de final'; break;
      case 4: textoRonda = 'Dieciseisavos de final'; break;
      default: textoRonda = `Ronda ${partido.ronda}`; break;
    }
  }
  container.querySelector('#ronda').textContent = textoRonda;

  // Ganador y empate iniciales
  const ganador =
    partido.empate ? 'Empate' :
    partido.ganadorUsuario1 ? partido.usuario1Nombre :
    partido.ganadorUsuario2 ? partido.usuario2Nombre :
    'Sin definir';
  container.querySelector('#ganador').textContent = ganador;
  container.querySelector('#empate').textContent = partido.empate ? 'Sí' : 'No';

  // Evento actualizar
  btnActualizar.addEventListener('click', async () => {
    const resultado1 = parseInt(inputResultado1.value);
    const resultado2 = parseInt(inputResultado2.value);

    const json = {
      resultadoUsuario1: resultado1,
      resultadoUsuario2: resultado2
    };

    try {
      const motorService = new MotorService();
      await motorService.actualizarPartido(partido.id, json);
      router();
      // Cerrar el modal
      const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      bootstrapModal.hide();
  
      // Mostrar mensaje de éxito
      showMessage("Resultado actualizado correctamente", "success");

    } catch (error) {
      console.error("Error al actualizar el resultado:", error);
      showMessage("Hubo un error al actualizar el resultado.", "danger");
    }
  });

  // Mostrar modal
  const bootstrapModal = new bootstrap.Modal(modalElement);
  bootstrapModal.show();
}
