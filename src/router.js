import { misTorneosView } from './views/misTorneos/misTorneosView.js';
import { homeView } from './views/home/homeView.js';
import { inscripcionesView } from './views/inscripciones/inscripcionesView.js';
import { welcomeView } from './views/welcome/welcomeView.js';
import { crearTorneoView } from './views/crearTorneo/crearTorneoView.js';
import { torneoView } from './views/torneo/torneoView.js';
import { mapaComponent } from './components/mapa/mapaComponent.js';
import { torneosAside } from './components/torneosAside/torneosAsideComponent.js';
import { renderLoginWidget } from './components/loginWidget/loginWidgetComponent.js';
import {removeBackgroundVideo } from './Utilities/removeBackGroundVideoUtils.js';





const routes = {
  '/welcome': welcomeView,
  '/home': homeView,
  '/torneos': misTorneosView,
  '/inscripciones': inscripcionesView,
  '/crear-torneo': crearTorneoView,
  '/torneo': torneoView,
  '/mapa': mapaComponent,
  '/torneos-aside': torneosAside,
  '/': homeView, 
};

let isRouting = false;
let asideRendered = false;


export async function router() {
  if (isRouting) return;
  isRouting = true;

  const fullHash = location.hash.slice(1) || '/';
  const [rawPath, queryString] = fullHash.split('?');
  const path = rawPath.toLowerCase();
  const app = document.querySelector('.main');

  const user = JSON.parse(localStorage.getItem('user'));

  renderLoginWidget();

  if (!user && path !== '/welcome') {
    location.hash = '#/welcome';
    isRouting = false;
    return;
  }

  if (user && (path === '/' || path === '/welcome')) {
    location.hash = '#/home';
    isRouting = false;
    return;
  }

  const asideContainer = document.querySelector('#aside');
  if (!user && path === '/welcome') {
    aside.style.display = 'none';
    asideContainer.innerHTML = '';
    asideRendered = false; 
  } else {
    aside.style.display = 'block';

    if (!asideRendered) {
      asideContainer.innerHTML = '';
      const asideContent = await torneosAside();
      asideContainer.appendChild(asideContent);
      asideRendered = true;
    }
  }


  const render = routes[path] || NotFound;

  const params = new URLSearchParams(queryString);
  const props = Object.fromEntries(params.entries());

  app.innerHTML = '';
  const content = await render(props);
  app.appendChild(content);

  isRouting = false;
}


window.addEventListener('hashchange', router);
window.addEventListener('load', router);


document.addEventListener('click', async (event) => {
  const link = event.target.closest('a');
  if (link && link.hash && link.hash === location.hash) {
    event.preventDefault(); 
    await router();              
  }
});

window.addEventListener('hashchange', () => {
  const route = window.location.hash;

  if (route !== '/welcome') {
    removeBackgroundVideo();
  }
});

