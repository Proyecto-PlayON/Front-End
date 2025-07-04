import { renderLoginWidget } from "../../components/loginWidget/loginWidgetComponent.js";
import { torneosAside } from "../../components/torneosAside/torneosAsideComponent.js";

export async function homeView(){
    
    const container = document.createElement('section');
    container.classList.add('content');

    // Cargar el HTML de la página
    const htmlResponse = await fetch('./views/home/homeView.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;

    renderLoginWidget();
    
    let asideContainer = document.querySelector('#aside');
    asideContainer.innerHTML = ''; // Limpiar contenido previo
    let asideContent = await torneosAside();
    asideContainer.appendChild(asideContent);

    return container;
} 