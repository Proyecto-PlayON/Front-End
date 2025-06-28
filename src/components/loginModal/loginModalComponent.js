import { UsuarioService } from "../../services/usuarioService.js";
import { setupRegisterFormHandler } from "../registerModal/registerModalComponent.js";
import { showMessage } from "../showMessages/showMessages.js"; // asegurate de tenerlo exportado

export async function setupLoginFormHandler() {

  const existingModal = document.querySelector('#loginModal');
  if (existingModal) {
    const modalInstance = bootstrap.Modal.getInstance(existingModal) || new bootstrap.Modal(existingModal);
    modalInstance.show();
    return;
  }

  const container = document.createElement('section');
  container.classList.add('content');

  const htmlResponse = await fetch('./components/loginModal/loginModalComponent.html');
  const htmlContent = await htmlResponse.text();
  container.innerHTML = htmlContent;


  document.body.appendChild(container);

  const modalElement = container.querySelector('#loginModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  const form = container.querySelector("#loginForm");
  if (!form) {
    showMessage("No se encontró el formulario de login", "danger");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usernameInput = form.querySelector("#username");
    const passwordInput = form.querySelector("#password");

    const userData = {
      userName: usernameInput.value,
      password: passwordInput.value,
    };

    const userService = new UsuarioService();

    try {
      const loggedUser = await userService.login(userData);

      if (loggedUser) {
        showMessage("¡Inicio de sesión exitoso!", "success");
        modal.hide();
        location.hash = '#/home';
      } 
      else {
        showMessage("Usuario o contraseña incorrectos.", "danger");
      }
    } 
    catch (error) {
      console.error("Error en login:", error);
      showMessage(error.message || "Ocurrió un error al intentar iniciar sesión.", "danger");
    }
  });

  const registerLink = form.querySelector('a[href="register.html"]');
  if (registerLink) {
    registerLink.addEventListener('click', async (e) => {
      e.preventDefault();
      modal.hide();
      modalElement.addEventListener('hidden.bs.modal', async () => {
        await setupRegisterFormHandler();
      }, { once: true });
    });
  }
}
