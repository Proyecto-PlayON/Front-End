export async function mostrarModalPartido(partido) {
  const container = document.createElement('section');
  container.classList.add('content');

  const htmlResponse = await fetch('./components/partidoModal/partidoModalComponent.html');
  const htmlContent = await htmlResponse.text();
  container.innerHTML = htmlContent;

  document.body.appendChild(container);

  const modalElement = container.querySelector('#partidoModal');

  // Participantes
  container.querySelector('#usuario1Nombre').textContent = partido.usuario1Nombre;
  container.querySelector('#usuario2Nombre').textContent = partido.usuario2Nombre;
  container.querySelector('#nombreEquipo1').textContent = partido.usuario1Nombre;
  container.querySelector('#nombreEquipo2').textContent = partido.usuario2Nombre;

  // Resultado central (tipo "1 - 1")
  const resultado = (partido.resultadoUsuario1 !== null && partido.resultadoUsuario2 !== null)
    ? `${partido.resultadoUsuario1} - ${partido.resultadoUsuario2}`
    : '-';
  container.querySelector('#resultadoCentral').textContent = resultado;

  // Ganador
  const ganador =
    partido.empate ? 'Empate' :
    partido.ganadorUsuario1 ? partido.usuario1Nombre :
    partido.ganadorUsuario2 ? partido.usuario2Nombre :
    'Sin definir';
  container.querySelector('#ganador').textContent = ganador;

  // Empate
  container.querySelector('#empate').textContent = partido.empate ? 'Sí' : 'No';

  // Fecha y estado
  const fecha = new Date(partido.fecha);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const hora = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');

  container.querySelector('#fecha').textContent = `${dia}/${mes} ${hora}:${minutos}`;
  container.querySelector('#fechaCentral').textContent = `${dia}/${mes}`;
  container.querySelector('#estado').textContent = partido.estadoId === 1 ? 'Finalizado' : 'Pendiente';

  // Ronda y siguiente partido
  container.querySelector('#ronda').textContent = partido.ronda;

  // Mostrar modal
  const bootstrapModal = new bootstrap.Modal(modalElement);
  bootstrapModal.show();
}
