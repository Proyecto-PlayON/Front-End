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

  
  container.querySelector('#nombreEquipo1').textContent = partido.usuario1Nombre;
  container.querySelector('#nombreEquipo2').textContent = partido.usuario2Nombre;

  const inputResultado1 = container.querySelector('#inputResultado1');
  const inputResultado2 = container.querySelector('#inputResultado2');

  const btnActualizar = container.querySelector('#btnActualizarResultado');
  btnActualizar.disabled = true;

  function verificarInputs() {
    const r1 = inputResultado1.value;
    const r2 = inputResultado2.value;
    btnActualizar.disabled = !(r1 !== '' && r2 !== '' && !isNaN(r1) && !isNaN(r2));
  }

  if (partido.estadoId !== 1) {
    inputResultado1.disabled = true;
    inputResultado2.disabled = true;
    btnActualizar.classList.add('d-none'); 
  }

  inputResultado1.addEventListener('input', verificarInputs);
  inputResultado2.addEventListener('input', verificarInputs);

  if (partido.resultadoUsuario1 !== null) inputResultado1.value = partido.resultadoUsuario1;
  if (partido.resultadoUsuario2 !== null) inputResultado2.value = partido.resultadoUsuario2;
  verificarInputs(); 

  let fechaText = 'Sin definir';
  let fechaCentralText = 'Sin definir';
  let dia = '', mes = '', hora = '', minutos = '';

  if (partido.fecha) {
    const fecha = new Date(partido.fecha);

    if (!isNaN(fecha)) { 
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
  
  const estadoElemento = container.querySelector('.estado-icono');
  if(partido.estadoId===1){

    estadoElemento.innerHTML = `<div class="estado" id="estado-pendiente">Pendiente</div>
            <i class="fa-solid fa-clock"></i>`;

  }
  else{
    estadoElemento.innerHTML = `<div class="estado" id="estado-finalizado">Finalizado</div>
            <i id="icono-fin" class="fa-solid fa-flag-checkered"></i>`;
  }
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

  const ganador =
    partido.empate ? 'Empate' :
    partido.ganadorUsuario1 ? partido.usuario1Nombre :
    partido.ganadorUsuario2 ? partido.usuario2Nombre :
    'Sin definir';
  container.querySelector('#ganador').textContent = ganador;
  container.querySelector('#empate').textContent = partido.empate ? 'Sí' : 'No';

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
      const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      bootstrapModal.hide();
  
      showMessage("Resultado actualizado correctamente", "success");

    } catch (error) {
      console.error("Error al actualizar el resultado:", error);
      showMessage("Hubo un error al actualizar el resultado.", "danger");
    }
  });

  const bootstrapModal = new bootstrap.Modal(modalElement);
  bootstrapModal.show();
}