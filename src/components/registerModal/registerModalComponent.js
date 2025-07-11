import { UsuarioService } from "../../services/usuarioService.js";
import { setupLoginFormHandler } from "../loginModal/loginModalComponent.js";
import { showMessage } from "../showMessages/showMessages.js";

export async function setupRegisterFormHandler() {

  if (document.querySelector('#registerModal')) {
    const modalInstance = new bootstrap.Modal(document.querySelector('#registerModal'));
    modalInstance.show();
    return;
  }
  const container = document.createElement('section');
  container.classList.add('content');

  const htmlResponse = await fetch('./components/registerModal/registerModalComponent.html');
  const htmlContent = await htmlResponse.text();
  container.innerHTML = htmlContent;


  document.body.appendChild(container);
  const registerModalElement = container.querySelector('#registerModal');
  const modalInstance = new bootstrap.Modal(registerModalElement);
  modalInstance.show();

  const form = container.querySelector('#registerForm');
  const errorDiv = container.querySelector('#registerError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const userName = form.querySelector('#username').value.trim();
    const password = form.querySelector('#password').value.trim();

    if (!name || !email || !userName || !password) {
      errorDiv.textContent = 'Todos los campos son obligatorios.';
      errorDiv.style.display = 'block';
      return;
    }

    const usuario = { name, email, userName, password };

    const usuarioService = new UsuarioService();
    try {
        await usuarioService.register(usuario);
        showMessage('¡Registro exitoso! Ahora podés iniciar sesión.', 'success');
 

        modalInstance.hide();

        registerModalElement.addEventListener('hidden.bs.modal', async () => {
            container.remove(); 
            setupLoginFormHandler();
        }, { once: true });

    } 
    catch (error) {
        console.error('Error al registrar usuario:', error);
        showMessage(error.message || 'Ocurrió un error al registrarse.', 'danger');
    }

  });

    const goToLoginLink = container.querySelector('#goToLogin');
    if (goToLoginLink) {
        goToLoginLink.addEventListener('click', (e) => {
            e.preventDefault();

            modalInstance.hide();

            registerModalElement.addEventListener('hidden.bs.modal', () => {
            container.remove(); 

            setupLoginFormHandler();
            }, { once: true }); 
        });
    }

}
