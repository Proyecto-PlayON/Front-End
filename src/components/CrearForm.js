export default function CrearForm({ areas, tipos, onSubmit }) {
  const html = `
    <section>
      <h2>Crear solicitud</h2>
      <form id="projectForm" class="project-form">
        <div class="input-group">
          <label>Nombre del Proyecto:</label>
          <input type="text" id="title" name="title" />
          <span class="error-message" id="error-title"></span>
        </div>

        <div class="input-group">
          <label>Descripción:</label>
          <input type="text" id="description" name="description" />
          <span class="error-message" id="error-description"></span>
        </div>

        <div class="input-group">
          <label>Área:</label>
          <select id="area" name="area">
            <option value="">Seleccione un área</option>
            ${areas
              .map(area => `<option value="${area.id}">${area.name}</option>`)
              .join("")}
          </select>
          <span class="error-message" id="error-area"></span>
        </div>

        <div class="input-group">
          <label>Tipo:</label>
          <select id="type" name="type">
            <option value="">Seleccione un tipo</option>
            ${tipos
              .map(tipo => `<option value="${tipo.id}">${tipo.name}</option>`)
              .join("")}
          </select>
          <span class="error-message" id="error-type"></span>
        </div>

        <div class="input-group">
          <label>Monto estimado:</label>
          <input type="text" id="amount" name="amount" />
          <span class="error-message" id="error-amount"></span>
        </div>

        <div class="input-group">
          <label>Duración estimada:</label>
          <input type="text" id="duration" name="duration" />
          <span class="error-message" id="error-duration"></span>
        </div>

        <button type="submit">Crear Proyecto</button>
      </form>
    </section>

    <div id="successMessage"></div>
  `;

  function addListeners(container) {
    const form = container.querySelector("#projectForm");
    const successMessage = container.querySelector("#successMessage");

    form.querySelectorAll("input, select").forEach(input => {
      input.addEventListener("input", () => {
        const errorSpan = form.querySelector(`#error-${input.name}`);
        if (errorSpan) {
          errorSpan.textContent = "";
          errorSpan.classList.remove("visible");
        }
      });
    });

    form.addEventListener("submit", e => {
      e.preventDefault();

      successMessage.textContent = "";
      form.querySelectorAll(".error-message").forEach(span => {
        span.textContent = "";
        span.classList.remove("visible");
      });

      const data = {
        title: form.title.value.trim(),
        description: form.description.value.trim(),
        area: form.area.value,
        type: form.type.value,
        amount: form.amount.value.trim(),
        duration: form.duration.value.trim()
      };

      onSubmit(data, form, successMessage);
    });
  }

  return { html, addListeners };
}