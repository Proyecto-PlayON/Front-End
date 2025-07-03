import { fixtureComponent } from "../../components/fixture/fixtureComponent.js";
import { rankingComponent } from "../../components/ranking/rankingComponent.js";
import { informacionComponent } from "../../components/informacion/informacionComponent.js";
import { inscripcionesView } from "../inscripciones/inscripcionesView.js";
import { MotorService } from "../../services/motorService.js";
import { TorneoService } from "../../services/torneoService.js";
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


    const motorService = new MotorService();
    const torneoService = new TorneoService();

    
    
    let ranking = [];
    let fixture = [];
    let torneo = {};

    try {
        torneo = await torneoService.getTorneoById(torneoId);
    } catch (error) {
        console.error("Error al obtener el torneo:", error);
        showMessage("Error al obtener el torneo.", "danger");
    }

    

    const informacionElement = await informacionComponent(torneo);

    const torneoHeader = container.querySelector('.torneo-informacion-header-view');
    torneoHeader.querySelector('h2').textContent = torneo.nombre;
    torneoHeader.querySelector('h4').textContent = torneo.nombreGanador || 'Aún no hay ganador';
    const torneoContainer = container.querySelector('.torneo-container-content-view');
    const torneoAside = container.querySelector('.torneo-informacion-aside-view');
    torneoAside.appendChild(informacionElement);

    if(torneo.estado.id == 1){
        const inscripcionesElement = await inscripcionesView(torneo);
        torneoContainer.appendChild(inscripcionesElement);
    }
    else {
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

        const fixtureElement = await fixtureComponent(fixture, torneo);
        const rankingElement = await rankingComponent(ranking);
        let torneoJugando = document.createElement('div');
        torneoJugando.classList.add('torneo-jugando');
        torneoJugando.classList.add('row');

        let rankingElementContainer = document.createElement('div');
        rankingElementContainer.classList.add('col-md-6');
        rankingElementContainer.appendChild(rankingElement);

        let fixtureElementContainer = document.createElement('div');
        fixtureElementContainer.classList.add('col-md-6');
        fixtureElementContainer.appendChild(fixtureElement);

        torneoJugando.appendChild(rankingElementContainer);
        torneoJugando.appendChild(fixtureElementContainer);

        torneoContainer.appendChild(torneoJugando);
    }
    
    


    return container;
}
