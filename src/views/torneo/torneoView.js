import { fixtureComponent } from "../../components/fixture/fixtureComponent.js";
import { rankingComponent } from "../../components/ranking/rankingComponent.js";
import { MotorService } from "../../services/motorService.js";
import { showMessage } from "../../components/showMessages/showMessages.js";

export async function torneoView() {
    const params = new URLSearchParams(location.hash.split('?')[1]);
    const torneoId = params.get('id');

    const container = document.createElement('section');
    container.classList.add('content');

    if (!torneoId) {
        showMessage("No se proporcionó un ID de torneo.", "danger");
        container.innerHTML = `<p class="text-white">No se proporcionó un ID de torneo.</p>`;
        return container;
    }

    // Cargar el HTML de la vista
    const htmlResponse = await fetch('./views/torneo/torneoView.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;

    // Cargar CSS si no está cargado aún
    const cssHref = './views/torneo/torneoView.css';
    if (!document.querySelector(`link[href="${cssHref}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssHref;
        document.head.appendChild(link);
    }

    const motorService = new MotorService();
    let ranking = [];
    let fixture = [];

    try {
        ranking = await motorService.getRankingByIdTorneo(torneoId);
    } catch (error) {
        console.error("Error al obtener ranking:", error);
        showMessage("Error al obtener el ranking del torneo.", "danger");
    }

    try {
        fixture = await motorService.getPartidosByIdTorneo(torneoId);
    } catch (error) {
        console.error("Error al obtener el fixture:", error);
        showMessage("Error al obtener el fixture del torneo.", "danger");
    }

    try {
        const fixtureElement = await fixtureComponent(fixture);
        const rankingElement = await rankingComponent(ranking);

        const torneoContainer = container.querySelector('.torneo-container-content');
        torneoContainer.appendChild(rankingElement);
        torneoContainer.appendChild(fixtureElement);
    } catch (error) {
        console.error("Error al renderizar componentes:", error);
        showMessage("Error al mostrar la información del torneo.", "danger");
    }

    return container;
}
