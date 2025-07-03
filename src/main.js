import { torneosAside } from "./components/torneosAside/torneosAsideComponent.js";
import { router } from "./router.js";

let asideContainer = document.querySelector('#aside');
let asideContent = await torneosAside();
asideContainer.appendChild(asideContent);




// Inicializar el router
await router();