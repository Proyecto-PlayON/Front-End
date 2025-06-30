export async function rankingComponent(ranking) {
    const container = document.createElement('section');
    container.classList.add('content');

    // Cargar el HTML de la tabla
    const htmlResponse = await fetch('./components/ranking/rankingComponent.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;

    // Seleccionar el tbody donde se insertarán los datos
    const tableBody = container.querySelector('tbody');
    tableBody.innerHTML = ""; // limpiar contenido previo

    let index = 0;
    // Generar filas para cada participante
    for(let participante of ranking) {
        const diferencia = participante.anotacionesAFavor - participante.anotacionesEnContra;

        const fila = document.createElement('tr');
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
