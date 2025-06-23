import TournementApi from "../services/tournamentServices.js";

export default async function loadTournaments() {
    const container = document.getElementById("tournamentContainer");
    container.innerHTML = "<p>Cargando torneos...</p>";

    const result = await TournementApi.GET();

    if (result.success) {
        const tournaments = result.data;
        if (tournaments.length === 0) {
            container.innerHTML = "<p>No hay torneos disponibles.</p>";
            return;
        }

        container.innerHTML = ""; // limpio el loading

        tournaments.forEach(tournament => {
            const card = document.createElement("div");
            card.className = "col";

            card.innerHTML = `
                <div class="card h-100 w-80">
                    
                    <div class="card-body text-center">
                        <h5 class="card-title">${tournament.nombre}</h5>
                        <p class="card-text">
                            Ubicación: ${tournament.ubicacion}<br>
                            Participantes: ${tournament.minimoParticipantes} - ${tournament.maximoParticipantes}<br>
                            Modalidad: ${tournament.modalidad?.nombre ?? "N/A"}<br>
                            Estado: ${tournament.estado?.nombre ?? "N/A"}<br>
                            Inicio: ${new Date(tournament.fechaInicio).toLocaleDateString()}
                        </p>
                    </div>
                     <div class="mt-3 d-flex justify-content-between">
        <button class="btn btn-primary btn-sm" onclick="verDetalles(${tournament.id})">Ver Detalles</button>
        <button class="btn btn-success btn-sm" onclick="inscribirse(${tournament.id})">Inscribirse</button>
      </div>
       <div class="card-footer text-center">
                        <small class="text-body-secondary">Finaliza: ${new Date("2025-07-07").toLocaleDateString()}</small>
                    </div>
    </div>
                   
                </div>
            `;

            container.appendChild(card);
        });
    } else {
        container.innerHTML = `<p class="text-danger">Error: ${result.message}</p>`;
    }
}