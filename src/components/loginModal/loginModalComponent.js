import { UsuarioService } from "../../services/usuarioService.js";
import { setupRegisterFormHandler } from "../registerModal/registerModalComponent.js";

export async function setupLoginFormHandler() {

  // ✅ Si ya existe el modal login, mostrarlo directamente
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

  const cssHref = './components/loginModal/loginModalComponent.css';
  if (!document.querySelector(`link[href="${cssHref}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssHref;
    document.head.appendChild(link);
  }

  document.body.appendChild(container);

  const modalElement = container.querySelector('#loginModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  const form = container.querySelector("#loginForm");
  if (!form) {
    console.warn("No se encontró el formulario de login");
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
    const loggedUser = await userService.login(userData);

    if (loggedUser) {
      modal.hide(); // Cerrar el modal
      location.hash = '#/home'; // Redirigir
    } else {
      const errorDiv = form.querySelector("#loginError");
      errorDiv.textContent = "Usuario o contraseña incorrectos.";
      errorDiv.style.display = "block";
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
