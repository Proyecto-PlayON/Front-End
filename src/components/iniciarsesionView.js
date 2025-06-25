import LoginForm from "../components/LoginForm.js";

function renderIniciarSesionView(container, onLogin) {
  const { html, addListeners } = LoginForm({
    onLogin: (user) => {
      if (onLogin) onLogin(user);
    }
  });

  container.innerHTML = `<section class="iniciar-sesion-view">${html}</section>`;
  const section = container.querySelector(".iniciar-sesion-view");
  addListeners(section);
}

export { renderIniciarSesionView };