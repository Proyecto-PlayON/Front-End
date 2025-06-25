import { patchProject } from "../services/modificarApi.js";

export default function ModificarForm({ proyecto, onSubmit }) {
  const html = `
    <form id="form-modificar-proyecto">
      <label for="input-titulo-mod">Nombre del Proyecto:</label>
      <input
        type="text"
        id="input-titulo-mod"
        value="${(proyecto.title || "").replace(/"/g, "&quot;")}"
      />

      <label for="input-descripcion-mod">Descripción:</label>
      <textarea id="input-descripcion-mod" rows="4">${proyecto.description || ""}</textarea>

      <label for="input-duracion-mod">Duración estimada (en meses):</label>
      <input
        type="number"
        id="input-duracion-mod"
        value="${proyecto.duration || ""}"
      />

      <button type="submit">Guardar Cambios</button>
      <div id="mensaje-resultado-mod"></div>
    </form>
  `;

  function addListeners(container) {
    const form = container.querySelector("#form-modificar-proyecto");
    const inputTitulo = form.querySelector("#input-titulo-mod");
    const inputDesc = form.querySelector("#input-descripcion-mod");
    const inputDuracion = form.querySelector("#input-duracion-mod");
    const mensaje = form.querySelector("#mensaje-resultado-mod");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      mensaje.className = "";
      mensaje.textContent = "";

      const actualizacion = {
        title: inputTitulo.value.trim(),
        description: inputDesc.value.trim(),
        duration: inputDuracion.value.trim()
      };

      try {
        await patchProject(proyecto.id, actualizacion);
        mensaje.textContent = "✅ Proyecto actualizado correctamente.";
        mensaje.className = "exito animado";
        
      } catch (err) {
        mensaje.textContent = "❌ " + err.message;
        mensaje.className = "error animado";
      }
    });
  }
  return { html, addListeners };
}
