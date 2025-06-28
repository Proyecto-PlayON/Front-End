import { mostrarModalPartido } from '../partidoModal/partidoModalComponent.js';

export async function fixtureComponent(fixture) {
    const container = document.createElement('section');
    container.classList.add('content');

    // Cargar HTML
    const htmlResponse = await fetch('./components/fixture/fixtureComponent.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;


    const toggleButton = container.querySelector(".dropdown-toggle");
    const menu = container.querySelector("#dropdownMenu");
    const dropdown = container.querySelector(".dropdown");
    const prevBtn = container.querySelectorAll(".nav-btn")[0];
    const nextBtn = container.querySelectorAll(".nav-btn")[1];
    const tableBody = container.querySelector(".fixture-table tbody");

    // Agrupar por ronda
    const rondasUnicas = [...new Set(fixture.map(f => f.ronda))].sort((a, b) => a - b);
    let rondaActualIndex = rondasUnicas.length - 1;

    // Llenar dropdown
    menu.innerHTML = '';
    rondasUnicas.forEach(ronda => {
        const item = document.createElement("div");
        item.className = "dropdown-item";
        item.textContent = `FECHA ${ronda}`;
        item.addEventListener("click", () => {
            rondaActualIndex = rondasUnicas.indexOf(ronda);
            actualizarRonda();
            menu.style.display = "none";
        });
        menu.appendChild(item);
    });

    // Mostrar u ocultar dropdown
    toggleButton.addEventListener("click", () => {
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    // Cerrar si se hace click fuera
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            menu.style.display = "none";
        }
    });

    // Botones de navegación
    prevBtn.addEventListener("click", () => {
        if (rondaActualIndex > 0) {
            rondaActualIndex--;
            actualizarRonda();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (rondaActualIndex < rondasUnicas.length - 1) {
            rondaActualIndex++;
            actualizarRonda();
        }
    });

    function actualizarRonda() {
        const ronda = rondasUnicas[rondaActualIndex];
        toggleButton.textContent = `FECHA ${ronda} `;
        renderPartidos(ronda);
    }

    function renderPartidos(ronda) {
        const partidos = fixture.filter(p => p.ronda === ronda);
        tableBody.innerHTML = '';

        if (partidos.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-white">No hay partidos para esta ronda.</td></tr>';
        } 
        else {
            for (const partido of partidos) {
                const row = document.createElement("tr");
                row.classList.add("partido");
                row.style.cursor = "pointer";


                row.innerHTML = `
                    <td class="participante1">${partido.usuario1Nombre}</td>
                    <td class="goles1">${partido.resultadoUsuario1}</td>
                    <td>-</td>
                    <td class="goles2">${partido.resultadoUsuario2}</td>
                    <td class="participante2">${partido.usuario2Nombre}</td>
                `;

                row.addEventListener("click", async () => {
                    await mostrarModalPartido(partido);
                });

                tableBody.appendChild(row);
            }
        }
    }

    // Render inicial
    actualizarRonda();

    return container;
}
