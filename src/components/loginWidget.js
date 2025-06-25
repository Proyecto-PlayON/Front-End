let loggedUser = null;
let navigateFn = () => {};

function setNavigate(fn) {
  navigateFn = fn;
}

function setLoggedUser(user) {
  loggedUser = user;
}

function getLoggedUser() {
  return loggedUser;
}

function renderLoginWidget() {
  const loginWidget = document.getElementById("login-widget");
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
      navigateFn("home");
    };
  } else {
    button.textContent = "Login";
    button.className = "btn-login";
    button.onclick = () => {
      navigateFn("iniciarsesion");
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

export {
  renderLoginWidget,
  setLoggedUser,
  getLoggedUser,
  setNavigate
};
