import userApi from "../services/userServices.js";

export default function setupLoginFormHandler() {
    console.log("setupLoginFormHandler ejecutado");
  const form = document.getElementById("loginForm");
  console.log("Formulario encontrado:", form);
  if (!form) {
    console.warn("No se encontró el formulario de login");
    return;
  }

  const button = document.querySelector("#loginForm button[type=submit]");
button.addEventListener("click", async (e) => {
    e.preventDefault();
 console.log("Submit del formulario capturado");
   
   const usernameInput = document.getElementById("usuario");
    const passwordInput = document.getElementById("contrasenia");
    const user = {
      userName: usernameInput.value,
      password: passwordInput.value,
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
      window.location.href = "../public/homepagelogged.html";

    } else {
      console.error("Login fallido:", result.message);
      alert("Error al iniciar sesión: " + result.message);
    }
  });
}