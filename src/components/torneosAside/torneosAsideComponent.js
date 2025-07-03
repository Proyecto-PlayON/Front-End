import { TorneoService } from "../../services/torneoService.js";
import { torneoView } from "../../views/torneo/torneoView.js";

export async function torneosAside() {
  const container = document.createElement('section');
  container.classList.add('content');

  const htmlResponse = await fetch('./components/torneosAside/torneosAsideComponent.html');
  const htmlContent = await htmlResponse.text();
  container.innerHTML = htmlContent;

  let lista = container.querySelector('#lista-torneos');
  let titulo = container.querySelector('.titulo-aside');
  // titulo.addEventListener('click', () => {
  //   lista.classList.toggle('visible');
  // });

  
  
  const torneoService = new TorneoService();
  const torneos = await torneoService.getTorneos();

  for (let torneo of torneos) {
    const li = document.createElement('li');
    li.classList.add('torneo-item'); // para estilo si querés

    li.innerHTML = `
    <div class="torneo-header">
        <span class="nombre">${torneo.nombre}</span>
        <span class="estado-dot estado-${torneo.estado?.id || '0'}"></span>
    </div>
    `;


    li.addEventListener('click', async () => {
        location.hash = `#/torneo?id=${torneo.id}`;
    });
    lista.appendChild(li);
  }

  
  return container;
}
