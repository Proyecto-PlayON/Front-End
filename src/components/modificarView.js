import ModificarForm from "../components/ModificarForm.js";
import { searchProjects } from "../services/buscarApi.js";

function renderModificarView() {
  const html = `
    <section class="modificar-view">
      <h2>Modificar Proyecto</h2>
      <div class="modificar-layout">
        <div class="modificar-listado">
          <h4>Proyectos Observados</h4>
          <div id="lista-proyectos-modificables"></div>
        </div>
        <div class="modificar-formulario" id="formulario-modificacion-container"></div>
      </div>
    </section>
  `;

  return { html, addListeners };
}

function addListeners(container, loggedUser) {
  const lista = container.querySelector("#lista-proyectos-modificables");
  const contenedorForm = container.querySelector("#formulario-modificacion-container");

  searchProjects({ createdBy: String(loggedUser.id), statusId: "4" }).then(proyectos => {
    if (!proyectos.length) {
      lista.innerHTML = `
        <p>No hay proyectos observados creados por usted.</p>
      `;
      return;
    }

    proyectos.forEach(proy => {
      const titulo =
        typeof proy.title === "string" && proy.title.trim()
          ? proy.title
          : `Proyecto #${proy.id?.slice?.(0, 6) || "sin título"}`;

      const btn = document.createElement("button");
      btn.className = "btn-proyecto-observado";
      btn.textContent = titulo;

      if (titulo.includes("Proyecto #")) {
        btn.classList.add("sin-titulo");
      }

      btn.addEventListener("click", () => {
        const { html, addListeners } = ModificarForm({
          proyecto: proy,
          onSubmit: () => {
            setTimeout(() => (contenedorForm.innerHTML = ""), 2000);
          }
        });

        contenedorForm.innerHTML = html;
        addListeners(contenedorForm);
      });

      lista.appendChild(btn);
    });
  });
}

export { renderModificarView, addListeners };
