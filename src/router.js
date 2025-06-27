import { misTorneosView } from './views/misTorneos/misTorneosView.js';
import { homeView } from './views/home/homeView.js';
import { inscripcionesView } from './views/inscripciones/inscripcionesView.js';
import { welcomeView } from './views/welcome/welcomeView.js';
import { crearTorneoView } from './views/crearTorneo/crearTorneoView.js';
import { torneoView } from './views/torneo/torneoView.js';

const routes = {
  '/welcome': welcomeView,
  '/home': homeView,
  '/torneos': misTorneosView,
  '/incripciones': inscripcionesView,
  '/crearTorneo': crearTorneoView,
  '/torneo': torneoView
};

export async function router() {
  const path = location.hash.slice(1) || '/';
  const app = document.querySelector('.main');

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user && path !== '/welcome') {
    location.hash = '#/welcome';
    return;
  }

  if (user && (path === '/' || path === '/welcome')) {
    location.hash = '#/home';
    return;
  }

  const render = routes[path] || NotFound;

  app.innerHTML = '';
  const content = await render();
  app.appendChild(content);
}

// Escuchar cambios de ruta
window.addEventListener('hashchange', router);
window.addEventListener('load', async () => {
  await router(); 
});

document.addEventListener('click', async (event) => {
  const link = event.target.closest('a');
  if (link && link.hash && link.hash === location.hash) {
    event.preventDefault(); 
    await router();              
  }
});


