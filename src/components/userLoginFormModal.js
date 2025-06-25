import userApi from "../services/userServices.js";

export default function setupLoginFormHandler() {
    console.log("setupLoginFormHandler ejecutado");
  const form = document.getElementById("loginForm");
  console.log("Formulario encontrado:", form);
  if (!form) {
    console.warn("No se encontró el formulario de login");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
 console.log("Submit del formulario capturado");
    const email = document.getElementById("usuario").value.trim();
    const password = document.getElementById("contrasenia").value;

    const user = {
      email,
      password,
    };

    const result = await userApi.Post(user);
  console.log("Resultado del login:", result);
    if (result.success) {
      console.log("Login exitoso");

      // Cerrar el modal
      const modalElement = document.getElementById("loginModal");
const modal = bootstrap.Modal.getInstance(modalElement);
modal.hide();

      // Opcional: redirigir o mostrar contenido protegido
      // window.location.href = "/dashboard.html";

    } else {
      console.error("Login fallido:", result.message);
      alert("Error al iniciar sesión: " + result.message);
    }
  });
}