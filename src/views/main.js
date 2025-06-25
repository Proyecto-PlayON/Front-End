/*import { renderIniciarSesionView } from "../components/iniciarsesionView.js";
import { renderCrearView } from "../components/crearView.js";
import { renderModificarView, addListeners as addListenersModificar } from "../components/modificarView.js";
import { renderEvaluarView, addListenersEvaluar } from "../components/evaluarView.js";
import renderBuscarView from "../components/buscarView.js";*/
import renderHomeView from "../components/homeView.js";
import {
  renderLoginWidget,
  setLoggedUser,
  getLoggedUser,
  setNavigate
} from "../components/loginWidget.js";



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
 /*   case "crear": {
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

    }

  */  case "buscar": {
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
   
/*
    case "iniciarsesion": {
      renderIniciarSesionView(mainContent, (user) => {
        setLoggedUser(user);
        renderLoginWidget();
        navigate("home");
      });
      mostrarFondoSiCorresponde(view);
      break;
    }
*/
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

  renderLoginWidget();
  navigate("home");
  mostrarFondoSiCorresponde("home");
});
document.addEventListener("click", (e) => {
  const card = e.target.closest("#ver-torneos-card");
  if (card) {
       console.log("Click en ver-torneos-card detectado, redirigiendo...");
    window.location.href = "../public/index.html";
  }
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
