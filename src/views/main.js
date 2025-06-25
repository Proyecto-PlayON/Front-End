import { renderIniciarSesionView } from "../components/iniciarsesionView.js";
import { renderCrearView } from "../components/crearView.js";
import { renderModificarView, addListeners as addListenersModificar } from "../components/modificarView.js";
import { renderEvaluarView, addListenersEvaluar } from "../components/evaluarView.js";
import renderBuscarView from "../components/buscarView.js";
import renderHomeView from "../components/homeView.js";
import {
  renderLoginWidget,
  setLoggedUser,
  getLoggedUser,
  setNavigate
} from "../components/loginWidget.js";
import { getProjectsPendingAndObserved } from "../services/getProjectsPendingAndObserved.js";
import { getProjectById } from "../services/getProjectByIdApi.js";
import setupLoginFormHandler from "../components/userLoginFormModal.js";
const mainContent = document.getElementById("main-content");

function mostrarFondoSiCorresponde(view) {
  const video = document.getElementById("video-fondo");
  if (!video) return;

  const vistasConFondo = ["home", "iniciarsesion"];
  video.classList.toggle("video-visible", vistasConFondo.includes(view));
  video.classList.toggle("video-oculto", !vistasConFondo.includes(view));
}

function navigate(view) {
  console.log(" Navegando a:", view);
  const user = getLoggedUser();
  mainContent.innerHTML = "";

  switch (view) {
    case "crear": {
      if (!user) {
        alert("Debe iniciar sesión para crear un proyecto.");
        navigate("iniciarsesion");
        return;
      }
      const { html, addListeners } = renderCrearView();
      mainContent.innerHTML = html;
      addListeners(mainContent);
      mostrarFondoSiCorresponde(view);
      break;
    }

    case "modificar": {
      if (!user) {
        alert("Debe iniciar sesión para modificar proyectos.");
        navigate("iniciarsesion");
        return;
      }
      const { html, addListeners } = renderModificarView();
      mainContent.innerHTML = html;
      addListeners(mainContent, user);
      mostrarFondoSiCorresponde(view);
      break;
    }

    case "evaluar": {
      if (!user) {
        alert("Debe iniciar sesión para evaluar proyectos.");
        navigate("iniciarsesion");
        return;
      }

    /*  getProjectsPendingAndObserved()
        .then(async (proyectos) => {
          const completos = await Promise.all(
            proyectos.map(p => getProjectById(p.id).catch(() => null))
          );
          const listos = completos.filter(p => p);
          mainContent.innerHTML = renderEvaluarView(listos, user);
          addListenersEvaluar(mainContent, listos, user);
          mostrarFondoSiCorresponde(view);
        })
        .catch(err => {
          mainContent.innerHTML = `<p>Error cargando proyectos: ${err.message}</p>`;
          mostrarFondoSiCorresponde(view);
        });
      break;*/
    }

    case "buscar": {
      if (!user) {
        alert("Debe iniciar sesión para buscar proyectos.");
        navigate("iniciarsesion");
        return;
      }
      const { html, addListeners } = renderBuscarView();
      mainContent.innerHTML = html;
      addListeners(mainContent, user);
      mostrarFondoSiCorresponde(view);
      break;
    }

    case "iniciarsesion": {
      renderIniciarSesionView(mainContent, (user) => {
        setLoggedUser(user);
        renderLoginWidget();
        navigate("home");
      });
      mostrarFondoSiCorresponde(view);
      break;
    }

    case "home":
    default: {
      mainContent.innerHTML = renderHomeView();
      mostrarFondoSiCorresponde(view);
      break;
    }
  }
}

window._navigate = navigate;
setNavigate(navigate);

document.addEventListener("DOMContentLoaded", () => {
  setupLoginFormHandler();
  renderLoginWidget();
  navigate("home");
  mostrarFondoSiCorresponde("home");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const view = link.getAttribute("data-view");

    const user = getLoggedUser();
    const privadas = ["crear", "modificar", "evaluar", "buscar"];
    if (privadas.includes(view) && !user) {
      alert("Debe iniciar sesión para acceder a esta opción.");
      navigate("iniciarsesion");
      return;
    }

    navigate(view);
    mostrarFondoSiCorresponde(view);
  });
});
