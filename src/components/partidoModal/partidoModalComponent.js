export async function mostrarModalPartido(partido) {

  const container = document.createElement('section');
  container.classList.add('content');

  const htmlResponse = await fetch('./components/partidoModal/partidoModalComponent.html');
  const htmlContent = await htmlResponse.text();
  container.innerHTML = htmlContent;


  document.body.appendChild(container);
    
  const modalElement = container.querySelector('#partidoModal');

  container.querySelector('#usuario1Nombre').textContent = partido.usuario1Nombre;
  container.querySelector('#usuario2Nombre').textContent = partido.usuario2Nombre;
  container.querySelector('#resultado').textContent = `${partido.resultadoUsuario1} - ${partido.resultadoUsuario2}`;

  const ganador =
    partido.empate ? 'Empate' :
    partido.ganadorUsuario1 ? partido.usuario1Nombre :
    partido.ganadorUsuario2 ? partido.usuario2Nombre :
    'Sin definir';

  container.querySelector('#ganador').textContent = ganador;
  container.querySelector('#empate').textContent = partido.empate ? 'Sí' : 'No';
  container.querySelector('#fecha').textContent = new Date(partido.fecha).toLocaleString();
  container.querySelector('#ronda').textContent = partido.ronda;
  container.querySelector('#siguiente').textContent = partido.siguientePartidoId ?? 'Ninguno';

  const bootstrapModal = new bootstrap.Modal(modalElement);
  bootstrapModal.show();
}
