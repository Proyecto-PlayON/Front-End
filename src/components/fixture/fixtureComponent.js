import { mostrarModalPartido } from '../partidoModal/partidoModalComponent.js';

export async function fixtureComponent(fixture, torneo) {
    const container = document.createElement('section');
    container.classList.add('content');

    const htmlResponse = await fetch('./components/fixture/fixtureComponent.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;


    const toggleButton = container.querySelector(".dropdown-toggle");
    const menu = container.querySelector("#dropdownMenu");
    const dropdown = container.querySelector(".dropdown");
    const prevBtn = container.querySelectorAll(".nav-btn")[0];
    const nextBtn = container.querySelectorAll(".nav-btn")[1];
    const tableBody = container.querySelector(".fixture-table tbody");

    const rondasUnicas = [...new Set(fixture.map(f => f.ronda))].sort((a, b) => a - b);
    
    let rondaActualIndex = rondasUnicas.findIndex(ronda => {
        const partidosDeRonda = fixture.filter(p => p.ronda === ronda);
        return partidosDeRonda.some(p => p.estadoId === 1);
    });

    if (rondaActualIndex === -1) {
        rondaActualIndex = rondasUnicas.length - 1;
    }

    menu.innerHTML = '';
    rondasUnicas.forEach(ronda => {
        const item = document.createElement("div");
        item.className = "dropdown-item";

        const numeroRondas = Math.max(...fixture.map(p => p.ronda));
        let textoRonda = '';
        if (torneo.modalidad.id === 2) {
            textoRonda = `Ronda ${ronda}`;
        } else {
            const diferencia = numeroRondas - ronda;
            switch (diferencia) {
            case 0: textoRonda = 'Final'; break;
            case 1: textoRonda = 'Semifinal'; break;
            case 2: textoRonda = 'Cuartos de final'; break;
            case 3: textoRonda = 'Octavos de final'; break;
            case 4: textoRonda = 'Dieciseisavos de final'; break;
            default: textoRonda = `Ronda ${ronda}`; break;
            }
        }
        
        item.textContent = textoRonda;
        item.addEventListener("click", () => {
            rondaActualIndex = rondasUnicas.indexOf(ronda);
            actualizarRonda();
            menu.style.display = "none";
        });
        menu.appendChild(item);
    });

    toggleButton.addEventListener("click", () => {
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            menu.style.display = "none";
        }
    });

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
        const numeroRondas = Math.max(...fixture.map(p => p.ronda));
        let textoRonda = '';
        if (torneo.modalidad.id === 2) {
            textoRonda = `Ronda ${ronda}`;
        } else {
            const diferencia = numeroRondas - ronda;
            switch (diferencia) {
            case 0: textoRonda = 'Final'; break;
            case 1: textoRonda = 'Semifinal'; break;
            case 2: textoRonda = 'Cuartos de final'; break;
            case 3: textoRonda = 'Octavos de final'; break;
            case 4: textoRonda = 'Dieciseisavos de final'; break;
            default: textoRonda = `Ronda ${ronda}`; break;
            }
        }
        toggleButton.textContent = textoRonda;
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

                let resultado1Text;
                let resultado2Text;
                if(partido.resultadoUsuario1 === null) {
                    resultado1Text = "-";
                    resultado2Text = "-";
                } else{
                    resultado1Text = partido.resultadoUsuario1;
                    resultado2Text = partido.resultadoUsuario2;
                }
                row.innerHTML = `
                    <td class="participante1">${partido.usuario1Nombre?? 'sin asignar'}</td>
                    <td class="goles1">${resultado1Text}</td>
                    <td>─</td>
                    <td class="goles2">${resultado2Text}</td>
                    <td class="participante2">${partido.usuario2Nombre?? 'sin asignar'}</td>
                `;

                row.addEventListener("click", async () => {
                    const maxRonda = Math.max(...fixture.map(p => p.ronda));
                    await mostrarModalPartido(partido, torneo, maxRonda);
                });

                tableBody.appendChild(row);
            }
        }
    }

    // Render inicial
    actualizarRonda();

    return container;
}
