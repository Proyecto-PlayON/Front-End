import TournementApi from '../services/tournamentServices.js'; // ajustá path si es necesario
export default async function renderTournamentCards(){

  const container = document.getElementById("tournament-container");
  const result = await TournementApi.GET();
console.log(result);
  if (result.success) {
    const torneos = result.data;

    if (torneos.length === 0) {
      container.innerHTML = `<p class="text-white text-center">No hay torneos disponibles.</p>`;
    } else {
      torneos.forEach(torneo => {
        const card = createTournamentCard(torneo);
        container.appendChild(card);
      });
    }
  } else {
    container.innerHTML = `<p class="text-danger text-center">Error: ${result.message}</p>`;
  }
};

function createTournamentCard({ nombre, ubicacion, modalidad, fechaInicio, estado }) {
  const estadoClass = {
    "Finalizado": "badge bg-danger",
    "En curso": "badge bg-success",
    "Pendiente": "badge bg-warning text-dark"
  }[estado] || "badge bg-secondary";

  const actualizarBtn = (estado === "Finalizado" || estado === "En curso")
    ? `<button class="btn btn-sm btn-${estado === "Finalizado" ? 'danger' : 'info'}">Actualizar</button>`
    : `<button class="btn btn-sm btn-success">Iniciar</button>`;

  const div = document.createElement("div");
  div.className = "tournament-card d-flex justify-content-between align-items-center px-4 py-3 my-2 rounded text-white";
  div.innerHTML = `
    <span>${nombre}</span>
    <span>${ubicacion}</span>
    <span>${modalidad.nombre}</span>
    <span>${new Date(fechaInicio).toLocaleDateString()}</span>
    <span><span class="${estadoClass}">${estado.nombre}</span></span>
    <span>
      <button class="btn btn-sm btn-dark me-2">👁 Ver más</button>
      ${actualizarBtn}
    </span>
  `;
  return div;
}
