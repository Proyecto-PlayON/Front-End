import CrearForm from "../components/CrearForm.js";
import { getAreas } from "../services/areaApi.js";
import { getProjectTypes } from "../services/typeApi.js";
import { getLoggedUser } from "../components/loginWidget.js";
import { postProyecto } from "../components/services/crearApi.js";

function renderCrearView() {
  return {
    html: `<section class="crear-view"><p>Cargando formulario...</p></section>`,
    addListeners: async container => {
      const areas = await getAreas();
      const tipos = await getProjectTypes();

      const { html, addListeners } = CrearForm({
        areas,
        tipos,
        onSubmit: async (data, form, messageEl) => {
          const user = getLoggedUser();
          if (!user || !user.id) {
            messageEl.style.color = "red";
            messageEl.textContent = "No has iniciado sesión";
            agregarListenersLimpieza(form, messageEl);
            return;
          }

          const payload = { ...data, createdBy: String(user.id) };
          console.log(" Enviando payload:", payload);

          try {
            const response = await postProyecto(payload);
            const raw = await response.text();
            console.log(" Respuesta RAW:", raw);

            let result = {};
            try {
              result = raw ? JSON.parse(raw) : {};
              console.log(" JSON parseado:", result);
            } catch (parseErr) {
              console.warn(" Error al parsear JSON:", parseErr);
              result = {};
            }

            if (!response.ok) {
              let mensajeGeneral = "";
              let algunoVisible = false;

              if (result?.errors) {
                for (const campo in result.errors) {
                  const mensaje = result.errors[campo]?.[0];
                  const span = form.querySelector(`#error-${campo.toLowerCase()}`);
                  if (span) {
                    span.textContent = mensaje;
                    span.classList.add("visible");
                    algunoVisible = true;
                  } else {
                    mensajeGeneral += `${mensaje}\n`;
                  }
                }

                if (!algunoVisible && mensajeGeneral) {
                  messageEl.style.color = "red";
                  messageEl.textContent = mensajeGeneral.trim();
                }
              } else if (result?.message) {
                messageEl.style.color = "red";
                messageEl.textContent = result.message;
              } else if (result?.title) {
                messageEl.style.color = "red";
                messageEl.textContent = result.title;
              } else {
                messageEl.style.color = "red";
                messageEl.textContent = "Ocurrió un error desconocido";
              }

              agregarListenersLimpieza(form, messageEl);
              return;
            }

            messageEl.style.color = "green";
            messageEl.textContent = "✅ Proyecto creado con éxito.";
            form.reset();

            const clearSuccess = () => {
              messageEl.textContent = "";
              document.removeEventListener("click", clearSuccess);
              document.removeEventListener("keydown", clearSuccess);
            };

            document.addEventListener("click", clearSuccess);
            document.addEventListener("keydown", clearSuccess);

          } catch (err) {
            console.error(" Error inesperado:", err);
            messageEl.style.color = "red";
            messageEl.textContent = "Error inesperado: " + err.message;
            agregarListenersLimpieza(form, messageEl);
          }
        }
      });

      const section = container.querySelector(".crear-view");
      section.innerHTML = html;
      addListeners(section);
    }
  };
}

function agregarListenersLimpieza(form, messageEl) {
  const limpiarErrores = () => {
    form.querySelectorAll(".error-message.visible").forEach(span => {
      span.textContent = "";
      span.classList.remove("visible");
    });
    messageEl.textContent = "";
    document.removeEventListener("click", limpiarErrores);
    document.removeEventListener("keydown", limpiarErrores);
  };

  document.addEventListener("click", limpiarErrores);
  document.addEventListener("keydown", limpiarErrores);
}

export { renderCrearView };
