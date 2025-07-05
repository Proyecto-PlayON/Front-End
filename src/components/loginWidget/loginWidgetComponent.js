import { setupLoginFormHandler } from "../loginModal/loginModalComponent.js";
import { setupRegisterFormHandler } from "../registerModal/registerModalComponent.js";
import { showMessage } from "../showMessages/showMessages.js"; // Asegurate de importar correctamente

let loggedUser = JSON.parse(localStorage.getItem('user')) || null;
let navigateFn = () => {};

function setNavigate(fn) {
  navigateFn = fn;
}

function setLoggedUser(user) {
  loggedUser = user;
  localStorage.setItem('user', JSON.stringify(user));
}

function getLoggedUser() {
  return loggedUser;
}
function renderLoginWidget() {
  // Refrescar estado por si cambió el localStorage
  loggedUser = JSON.parse(localStorage.getItem('user')) || null;

  const loginWidget = document.getElementById("login-widget");
  loginWidget.innerHTML = "";

  const topRow = document.createElement("div");
  topRow.className = "login-top-row";

  const button = document.createElement("button");

  if (loggedUser) {
    button.textContent = "LogOut";
    button.className = "btn-logout";
    button.onclick = () => {
      loggedUser = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      renderLoginWidget();
      location.hash = "#/welcome";
      showMessage("Sesión cerrada correctamente", "info"); // 👈 Mensaje al cerrar sesión
    };
  } else {
    button.textContent = "Login";
    button.className = "btn-login";
    button.onclick = () => {
      setupLoginFormHandler(); // Se abre el modal
    };
  }

  topRow.appendChild(button);
  loginWidget.appendChild(topRow);

  if (loggedUser) {
    const userSpan = document.createElement("span");
    userSpan.textContent = loggedUser.userName;
    userSpan.className = "logged-user";
    loginWidget.appendChild(userSpan);
  }
}

export {
  renderLoginWidget,
  setLoggedUser,
  getLoggedUser,
  setNavigate
};
