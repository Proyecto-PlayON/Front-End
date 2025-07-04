import { misTorneosView } from './views/misTorneos/misTorneosView.js';
import { homeView } from './views/home/homeView.js';
import { inscripcionesView } from './views/inscripciones/inscripcionesView.js';
import { welcomeView } from './views/welcome/welcomeView.js';
import { crearTorneoView } from './views/crearTorneo/crearTorneoView.js';
import { torneoView } from './views/torneo/torneoView.js';
import { mapaComponent } from './components/mapa/mapaComponent.js';
import { torneosAside } from './components/torneosAside/torneosAsideComponent.js';

const routes = {
  '/welcome': welcomeView,
  '/home': homeView,
  '/torneos': misTorneosView,
  '/inscripciones': inscripcionesView,
  '/crear-torneo': crearTorneoView,
  '/torneo': torneoView,
  '/mapa': mapaComponent,
  '/torneos-aside': torneosAside,
  '/': homeView, // Redirigir a home si no hay hash
};

export async function router() {
  const fullHash = location.hash.slice(1) || '/';
  const [rawPath, queryString] = fullHash.split('?');
  const path = rawPath.toLowerCase(); // para asegurar coincidencias
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

  // Parsear parámetros
  const params = new URLSearchParams(queryString);
  const props = Object.fromEntries(params.entries()); // ejemplo: { id: "4" }

  


  app.innerHTML = '';
  const content = await render(props);
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
