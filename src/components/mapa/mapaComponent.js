export async function mapaComponent(latitud, longitud, nombre = "") {
  const container = document.createElement('section');
  container.classList.add('mapa-container');

  const htmlResponse = await fetch('./components/mapa/mapaComponent.html');
  const htmlContent = await htmlResponse.text();
  container.innerHTML = htmlContent;

  setTimeout(() => {
    const mapContainer = container.querySelector('#map');
    if (!mapContainer) {
      console.error("No se encontró el contenedor del mapa.");
      return;
    }

    const map = L.map(mapContainer).setView([latitud, longitud], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const marcador = L.marker([latitud, longitud]).addTo(map);
    if (nombre) {
      marcador.bindPopup(`<strong>${nombre}</strong>`).openPopup();
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 300);

  }, 0);


  return container;
}
