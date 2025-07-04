import { mapaComponent } from "../mapa/mapaComponent.js";

export async function informacionComponent(torneo) {
  const container = document.createElement('section');
  container.classList.add('content');

  // Cargar el HTML del mapa
  const htmlResponse = await fetch('./components/informacion/informacionComponent.html');
  const htmlContent = await htmlResponse.text();
  container.innerHTML = htmlContent;

  // Obtener elementos y modificar su contenido según los datos del torneo
  const listaInfo = container.querySelector('.informacion-content ul');
  const ubicacionTitulo = container.querySelector('.informacion-content strong');
  const mapaContainer = container.querySelector('.map-informacion-container');

  // Formatear fechas
  const fechaInicio = new Date(torneo.fechaInicio);
  const fechaFinalizacion = new Date(torneo.fechaFinalizacion);
  const formatoFecha = (fecha) =>
    fecha.getFullYear() === 1 ? 'No finalizado' :
    fecha.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });

  // Crear lista dinámica con la información
  listaInfo.innerHTML = `
    <li><strong>Fecha de Inicio:</strong>${formatoFecha(fechaInicio)}</li>
    <li><strong>Fecha de Finalización:</strong> ${formatoFecha(fechaFinalizacion)}</li>
    <li><strong>Modalidad:</strong> ${torneo.modalidad?.nombre ?? 'Sin definir'}</li>
    <li><strong>Estado:</strong> ${torneo.estado?.nombre ?? 'Desconocido'}</li>
    <li><strong>Equipos Participantes:</strong> ${torneo.inscripciones.length} equipos</li>
  `;

  // Ubicación
  ubicacionTitulo.textContent = `Ubicación: ${torneo.ubicacion}`;

  // Si quieres agregar un mapa, por ejemplo con Leaflet.js o Google Maps API, puedes usar latitud y longitud aquí:
  // Ejemplo ficticio (reemplaza con el código real del mapa que uses):
  if (torneo.latitud !== 0 && torneo.longitud !== 0) {
    console.log(`Cargando mapa para: ${torneo.ubicacion} (${torneo.latitud}, ${torneo.longitud})`);
    const mapa = await mapaComponent(parseFloat(torneo.latitud), parseFloat(torneo.longitud), torneo.nombre);
    mapaContainer.innerHTML = "";
    mapaContainer.appendChild(mapa);
  } else {
    mapaContainer.innerHTML = `<p>Coordenadas no disponibles</p>`;
  }

  return container;
}
