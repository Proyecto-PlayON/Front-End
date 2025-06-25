import { getProjectById } from "../services/getProjectByIdApi.js";
import EvaluarForm from "../components/EvaluarForm.js";

function renderEvaluarView(proyectos, loggedUser) {
  console.log(" [EvaluarView] Renderizando con usuario:", loggedUser);
  console.log(" Proyectos recibidos:", proyectos);

  const proyectosFiltrados = proyectos.filter(project => {
    const steps = Array.isArray(project.steps) ? project.steps : [];
    const statusId = project.status?.id;

    console.log(` Proyecto "${project.title}" (ID: ${project.id})`);
    console.log(" Steps:", steps);

    const primerRevisable = [...steps]
      .sort((a, b) => a.stepOrder - b.stepOrder)
      .find(step => step.status?.id === 1 || step.status?.id === 4); 

    if (!primerRevisable) {
      console.warn(" Sin step evaluable encontrado para este proyecto.");
      return false;
    }

    const puedeEvaluar = primerRevisable &&
      (primerRevisable.approverUser?.id === loggedUser.id ||
       primerRevisable.approverRole?.id === loggedUser.role?.id);

    console.log("🔍 Step evaluado:", {
      stepOrder: primerRevisable.stepOrder,
      status: primerRevisable.status?.name,
      approverUserId: primerRevisable.approverUser?.id,
      approverRoleId: primerRevisable.approverRole?.id,
      userId: loggedUser.id,
      userRoleId: loggedUser.role?.id,
      puedeEvaluar
    });

    const resultado = (statusId === 1 || statusId === 4) && puedeEvaluar;
    console.log(`✅ Puede evaluar este proyecto: ${resultado}\n`);
    return resultado;
  });

  let html = `<section class="evaluar-view"><h2>Evaluar proyecto</h2><ul>`;

  if (!proyectosFiltrados.length) {
    html += `<p>No hay proyectos pendientes u observados para su rol.</p>`;
    console.warn(" [EvaluarView] Ningún proyecto está disponible para evaluar.");
  } else {
    html += proyectosFiltrados.map(p => {
      const estado = p.status?.name || "Desconocido";
      const clase = estado
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      return `
        <li>
          <strong>${p.title}</strong> – Estado: 
          <span class="estado-${clase}">${estado}</span>
          <button class="btn-seleccionar" data-id="${p.id}">Seleccionar</button>
        </li>`;
    }).join("");
  }

  html += `</ul><div id="formulario-evaluacion-container"></div></section>`;
  return html;
}

function addListenersEvaluar(container, proyectos, loggedUser) {
  const botones = container.querySelectorAll(".btn-seleccionar");

  botones.forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      const contenedor = container.querySelector("#formulario-evaluacion-container");

      console.log(` [EvaluarView] Clic en botón "Seleccionar" – Proyecto ID: ${id}`);
      contenedor.innerHTML = `<p>Cargando proyecto...</p>`;

      try {
        const proyecto = await getProjectById(id);
        console.log(" Proyecto cargado desde API:", proyecto);

        const { html, addListeners } = EvaluarForm({
          project: proyecto,
          loggedUser,
          onFinish: (evaluatedId) => {
            console.log("✅ Evaluación finalizada para proyecto ID:", evaluatedId);

            contenedor.innerHTML = `<p style="color: #22c55e; font-weight: bold;">✅ Evaluación enviada con éxito.</p>`;

            const btnEvaluado = container.querySelector(`.btn-seleccionar[data-id="${evaluatedId}"]`);
            if (btnEvaluado) {
              btnEvaluado.disabled = true;
              btnEvaluado.textContent = "Evaluado";
              btnEvaluado.style.opacity = "0.5";
              btnEvaluado.style.cursor = "default";
            }
          }
        });

        contenedor.innerHTML = html;
        addListeners(contenedor);
      } catch (err) {
        console.error("❌ Error al cargar el proyecto:", err);
        contenedor.innerHTML = `<p style="color:red;">Error al cargar proyecto: ${err.message}</p>`;
      }
    });
  });

  console.log(" [EvaluarView] Listeners agregados a botones de seleccionar");
}

export { renderEvaluarView, addListenersEvaluar };
