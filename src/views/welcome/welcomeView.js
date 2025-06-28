import { renderLoginWidget } from "../../components/loginWidget/loginWidgetComponent.js";

export async function welcomeView() {
    const container = document.createElement('section');
    container.classList.add('content');

    // Cargar el HTML de la página
    const htmlResponse = await fetch('./views/welcome/welcomeView.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;


    renderLoginWidget();

    

    return container;
}