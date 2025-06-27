import { fixtureComponent } from "../../components/fixture/fixtureComponent.js";
import { rankingComponent } from "../../components/ranking/rankingComponent.js";
import { MotorService } from "../../services/motorService.js";

export async function torneoView(){
    
    const container = document.createElement('section');
    container.classList.add('content');

    // Cargar el HTML de la página
    const htmlResponse = await fetch('./views/torneo/torneoView.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;

    // Cargar y aplicar el CSS solo si no se ha cargado antes
    const cssHref = './views/torneo/torneoView.css';
    if (!document.querySelector(`link[href="${cssHref}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssHref;
        document.head.appendChild(link);
    }

    let motorService = new MotorService();
    let ranking = await motorService.getRankingByIdTorneo(1);
    let fixture = await motorService.getPartidosByIdTorneo(1);
    let fixtureElement = await fixtureComponent(fixture);
    let rankingElement = await rankingComponent(ranking);

    let torneoContainer = container.querySelector('.torneo-container-content')
    torneoContainer.appendChild(rankingElement);
    torneoContainer.appendChild(fixtureElement);
    



    return container;
} 