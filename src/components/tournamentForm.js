import TournamentApi from "../services/tournamentServices.js";

export default function handleTournamentForm()
{
 document.getElementById("tournamentForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const payload = {
      nombre: document.getElementById("nombre").value,
      usuarioOrganizadorId: document.getElementById("usuarioOrganizadorId").value,
      ubicacion: document.getElementById("ubicacion").value,
      latitud: document.getElementById("latitud").value,
      longitud: document.getElementById("longitud").value,
      minimoParticipantes: document.getElementById("minimoParticipantes").value,
      maximoParticipantes: document.getElementById("maximoParticipantes").value,
      fechaInicio: new Date(document.getElementById("fechaInicio").value).toISOString(),
      modalidadId: document.getElementById("modalidadId").value,
      permitirEmpates: document.getElementById("permitirEmpates").checked,
      puntosPorVictoria: document.getElementById("puntosPorVictoria").value,
      puntosPorEmpate: document.getElementById("puntosPorEmpate").value,
      puntosPorDerrota: document.getElementById("puntosPorDerrota").value,
    };
     try {
        console.log("Payload a enviar:", payload);
      const response = await TournamentApi.POST(payload);
      if (response.success) {
        alert("✅ Torneo creado exitosamente.");
        // Opcional: limpiar formulario
        document.getElementById("tournamentForm").reset();
        // Opcional: redirigir
        // window.location.href = "torneos.html";
      } else {
        alert("❌ Error al crear el torneo: " + response.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Ocurrió un error inesperado.");
    }


});

}