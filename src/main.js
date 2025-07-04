import { torneosAside } from "./components/torneosAside/torneosAsideComponent.js";
import { renderLoginWidget } from "./components/loginWidget/loginWidgetComponent.js";
import { router } from "./router.js";

let asideContainer = document.querySelector('#aside');
let asideContent = await torneosAside();
asideContainer.appendChild(asideContent);

renderLoginWidget();


// Inicializar el router
await router();