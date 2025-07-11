export async function rankingComponent(ranking) {
    const container = document.createElement('section');
    container.classList.add('content');

    const htmlResponse = await fetch('./components/ranking/rankingComponent.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;

    const tableBody = container.querySelector('tbody');
    tableBody.innerHTML = "";

    let index = 0;
    for(let participante of ranking) {
        const diferencia = participante.anotacionesAFavor - participante.anotacionesEnContra;

        const fila = document.createElement('tr');
        if (index === 0) {
            fila.classList.add('top-rank');
        }
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${participante.participante.nombre}</td>
            <td>${participante.puntos}</td>
            <td>${participante.partidosJugados}</td>
            <td>${participante.partidosGanados}</td>
            <td>${participante.partidosEmpatados}</td>
            <td>${participante.partidosPerdidos}</td>
            <td>${diferencia}</td>
            <td>${participante.anotacionesAFavor}:${participante.anotacionesEnContra}</td>
        `;

        tableBody.appendChild(fila);
        index++;
    }

    return container;
}
