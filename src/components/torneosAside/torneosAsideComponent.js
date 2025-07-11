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
 

  
  
  const torneoService = new TorneoService();
  const torneos = await torneoService.getTorneos();
  if (torneos.length === 0) {
    lista.innerHTML = '<li class="torneo-item">No hay torneos disponibles</li>';
    return container;
  }

  for (let torneo of torneos) {
    const li = document.createElement('li');
    li.classList.add('torneo-item'); 

    
    li.innerHTML = `
    <div class="torneo-header">
        <span class="nombre">${torneo.nombre}</span>
    </div>
    `;
  const torneoHeader = li.querySelector('.torneo-header');
  console.log(torneo.estado.id);
   if(torneo.estado.id===2){
    torneoHeader.innerHTML+= `<i class="fas fa-spinner slow-spin"></i>`;
   }
   else if(torneo.estado.id===3){
    torneoHeader.innerHTML+= `<i id="icono-fin" class="fa-solid fa-flag-checkered">`;
   }
   else{
    torneoHeader.innerHTML += `<i class="fa-solid fa-clock">`;
   }
   


    li.addEventListener('click', async () => {
        location.hash = `#/torneo?id=${torneo.id}`;
    });
    lista.appendChild(li);
  }

  
  return container;
}
