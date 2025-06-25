import { patchProjectDecision } from "../services/evaluarApi.js";

export default function EvaluarForm({ project, loggedUser }) {
  const steps = Array.isArray(project.steps) ? project.steps : [];

  const revisableStep = [...steps]
    .sort((a, b) => a.stepOrder - b.stepOrder)
    .find(step => step.status?.id === 1 || step.status?.id === 4);

  const puedeEvaluar =
    revisableStep &&
    (revisableStep.approverUser?.id === loggedUser.id ||
     revisableStep.approverRole?.id === loggedUser.role?.id);

  const html = `
    <h3>Proyecto seleccionado: ${project.title}</h3>
    <p><strong>Descripción:</strong> ${project.description}</p>
    <p><strong>Monto:</strong> $${project.amount}</p>
    <p><strong>Duración:</strong> ${project.duration} meses</p>
    <p><strong>Área:</strong> ${project.area?.name}</p>
    <p><strong>Tipo:</strong> ${project.type?.name}</p>

    <h4>Pasos de aprobación:</h4>
    <ul>
      ${steps.map(step => {
        const estado = step.status?.name || "";
        const clase = estado
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        return `
          <li>
            Paso #${step.stepOrder} — Rol: ${step.approverRole?.name} — Estado:
            <span class="estado-${clase}">${estado}</span>
          </li>`;
      }).join("")}
    </ul>

    ${puedeEvaluar ? `
      <h4>Evaluación del Proyecto</h4>
      <label for="statusSelect">Estado de la evaluación:</label><br/>
      <select id="statusSelect">
        <option value="">Seleccione una opción...</option>
        <option value="2">Aprobado</option>
        <option value="3">Rechazado</option>
        <option value="4">Observar</option>
      </select><br/><br/>

      <label for="observaciones">Observaciones:</label><br/>
      <textarea id="observaciones" rows="4" cols="50" placeholder="Ingrese observaciones..."></textarea>
      <div id="mensaje-error-evaluacion" style="display: none; color: red; margin-top: 5px;"></div>
      <br/><br/>

      <button id="btn-enviar-decision">Enviar decisión</button>
    ` : `<p><em>No tiene autorización para evaluar este proyecto en esta etapa.</em></p>`}
  `;

  function addListeners(container) {
    if (!puedeEvaluar) return;

    const mensajeError = container.querySelector("#mensaje-error-evaluacion");
    const select = container.querySelector("#statusSelect");
    const textarea = container.querySelector("#observaciones");

    container.querySelector("#btn-enviar-decision").addEventListener("click", async () => {
      mensajeError.style.display = "none";
      mensajeError.textContent = "";

      const statusId = select.value.trim();
      const obs = textarea.value.trim();

      if (!statusId) {
        mensajeError.textContent = "Seleccione un estado válido antes de enviar.";
        mensajeError.style.display = "block";
        return;
      }

      const statusMap = {
        "2": "APROBADO",
        "3": "RECHAZADO",
        "4": "OBSERVADO"
      };

      const mappedStatus = statusMap[statusId];
      if (!mappedStatus) {
        mensajeError.textContent = "Estado inválido seleccionado.";
        mensajeError.style.display = "block";
        return;
      }

      try {
        await patchProjectDecision(project.id, String(loggedUser.id), mappedStatus, obs);

        container.innerHTML = `
          <p style="color: #22c55e; font-weight: bold; font-size: 1.1rem;">
            ✅ Evaluación enviada con éxito.
          </p>
        `;

        
        requestAnimationFrame(() => {
          const reiniciar = () => {
            console.log("🔁 Click o tecla detectada → navigate('evaluar')");
            document.removeEventListener("click", reiniciar);
            document.removeEventListener("keydown", reiniciar);

            const navigate = window._navigate;
            if (typeof navigate === "function") {
              navigate("evaluar");
            } else {
              console.warn("⚠️ window._navigate no está definido");
            }
          };

          document.addEventListener("click", reiniciar);
          document.addEventListener("keydown", reiniciar);
        });
      } catch (err) {
        console.error("❌ Error al enviar evaluación:", err);
        mensajeError.textContent = err.message;
        mensajeError.style.display = "block";
      }
    });
  }

  return { html, addListeners };
}
