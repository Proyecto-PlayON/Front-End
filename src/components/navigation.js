import LoginForm from "../components/LoginForm.js";
import { renderCrearView } from "../components/crearView.js";
import renderModificarView from "../components/modificarView.js";
import renderEvaluarView from "../components/evaluarView.js";

import renderBuscarView from "../components/buscarView.js";
import renderHomeView from "../components/homeView.js";

const mainContent = document.getElementById("main-content");
const loginWidget = document.getElementById("login-widget");

let loggedUser = null;

function renderLoginWidget() {
  loginWidget.innerHTML = "";

  const topRow = document.createElement("div");
  topRow.className = "login-top-row";

  const statusWrapper = document.createElement("span");
  statusWrapper.className = "login-status";

  const statusLabel = document.createElement("span");
  statusLabel.textContent = "Estado: ";
  statusWrapper.appendChild(statusLabel);

  const statusText = document.createElement("span");
  statusText.id = "login-status-text";

  if (loggedUser) {
    statusText.textContent = "Conectado";
    statusText.className = "status-connected";
  } else {
    statusText.textContent = "Desconectado";
    statusText.className = "status-disconnected";
  }
  statusWrapper.appendChild(statusText);

  const button = document.createElement("button");

  if (loggedUser) {
    button.textContent = "Log Out";
    button.className = "btn-logout";
    button.onclick = () => {
      loggedUser = null;
      renderLoginWidget();
      navigate("home");
    };
  } else {
    button.textContent = "Login";
    button.className = "btn-login";
    button.onclick = () => {
      navigate("login");
    };
  }

  topRow.appendChild(button);
  topRow.appendChild(statusWrapper);

  loginWidget.appendChild(topRow);

  if (loggedUser) {
    const userSpan = document.createElement("span");
    userSpan.textContent = loggedUser.name;
    userSpan.className = "logged-user";
    loginWidget.appendChild(userSpan);
  }
}

function renderLoginView() {
  const { html, addListeners } = LoginForm({
    onLogin: (user) => {
      loggedUser = user;
      renderLoginWidget();
      navigate("home");
    }
  });

  mainContent.innerHTML = html;
  addListeners(mainContent);
}

function navigate(view) {
  console.log("navigating to:", view);
 
  mainContent.innerHTML = "";

  switch (view) {
    case "crear": {
      const { html, addListeners } = renderCrearView();
      mainContent.innerHTML = html;
      addListeners(mainContent);
      break;
    }
    case "modificar":
      mainContent.innerHTML = renderModificarView();
      break;
    case "evaluar":
      mainContent.innerHTML = renderEvaluarView();
      break;
   
    case "buscar": {
  const { html, addListeners } = renderBuscarView();
  mainContent.innerHTML = html;
  addListeners(mainContent);
}
break;

    case "login":
      renderLoginView();
      break;
    case "home":
    default:
      mainContent.innerHTML = renderHomeView();
      break;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderLoginWidget();
  navigate("home");
});

export { renderLoginWidget, navigate };
