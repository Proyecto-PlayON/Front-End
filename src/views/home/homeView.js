import { renderLoginWidget } from "../../components/loginWidget/loginWidgetComponent.js";

export async function homeView(){
    
    const container = document.createElement('section');
    container.classList.add('content');

    // Cargar el HTML de la página
    const htmlResponse = await fetch('./views/home/homeView.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;


    renderLoginWidget();

    return container;
} 