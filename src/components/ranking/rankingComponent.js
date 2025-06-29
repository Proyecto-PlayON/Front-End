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

    // Ordenar por puntos descendente
    const rankingOrdenado = [...ranking].sort((a, b) => b.puntos - a.puntos);

    // Generar filas para cada participante
    rankingOrdenado.forEach((item, index) => {
        const {
            participante: { nombre },
            puntos,
            anotacionesAFavor,
            anotacionesEnContra
        } = item;

        const jugados = 3; // asumido (podés calcularlo si tenés más datos)
        const ganados = 3;
        const empates = 0; // si no hay empates registrados
        const perdidos = 0;
        const diferencia = anotacionesAFavor - anotacionesEnContra;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${nombre}</td>
            <td>${puntos}</td>
            <td>${jugados}</td>
            <td>${ganados}</td>
            <td>${empates}</td>
            <td>${perdidos}</td>
            <td>${diferencia}</td>
            <td>${anotacionesAFavor}:${anotacionesEnContra}</td>
        `;

        tableBody.appendChild(fila);
    });

    return container;
}
