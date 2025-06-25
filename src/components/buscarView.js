import BuscarForm from "../components/BuscarForm.js";
import { searchProjects } from "../services/buscarApi.js";

export default function renderBuscarView() {
  return {
    html: `<section class="buscar-view"><p>Cargando formulario de búsqueda...</p></section>`,
    addListeners: (container, loggedUser) => {
      const { html, addListeners } = BuscarForm({
        loggedUser,
        onBuscar: async (filtros, destino) => {
          const proyectos = await searchProjects(filtros);
          mostrarResultados(destino, proyectos);
        }
      });

      const section = container.querySelector(".buscar-view");
      section.innerHTML = html;
      addListeners(section);
    }
  };
}

function mostrarResultados(container, proyectos = []) {
  const contenedor = container.querySelector("#resultados-busqueda");

  if (!proyectos.length) {
    contenedor.innerHTML = `<p>No se encontraron proyectos con los filtros aplicados.</p>`;

    return;
  }

  const tarjetas = proyectos.map(p => `
    <div class="tarjeta-proyecto">
      <h3>${p.title}</h3>
      <p><strong>Área:</strong> ${p.area}</p>
      <p><strong>Tipo:</strong> ${p.type}</p>
      <p><strong>Monto:</strong> $${p.amount}</p>
      <p><strong>Duración:</strong> ${p.duration} meses</p>
      <p><strong>Estado:</strong> ${p.status}</p>
    </div>
  `).join("");

  contenedor.innerHTML = tarjetas;
}
