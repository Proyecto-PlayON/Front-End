import confetti from 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.module.mjs';

export async function avisoGanadorComponent(nombreGanador) {
    // Crear el mensaje flotante
    const mensaje = document.createElement('div');
    const corona = document.createElement('img');
    corona.src = './assets/img/corona.png';
    

    mensaje.textContent = `🏆 ¡${nombreGanador} ha ganado el torneo!`;
    mensaje.style.position = 'fixed';
    mensaje.style.top = '50%';
    mensaje.style.left = '50%';
    mensaje.style.transform = 'translate(-50%, -50%)';
    mensaje.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    mensaje.style.color = 'white';
    mensaje.style.padding = '2rem 3rem';
    mensaje.style.borderRadius = '12px';
    mensaje.style.fontSize = '1.5rem';
    mensaje.style.zIndex = '9999';
    mensaje.style.textAlign = 'center';
    mensaje.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.4)';
    document.body.appendChild(mensaje);

    const duration = 7000;
    const end = Date.now() + duration;

    (function frameSerpentinas() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
        });

        if (Date.now() < end) {
            requestAnimationFrame(frameSerpentinas);
        }
    })();

    const interval = setInterval(() => {
        const timeLeft = end - Date.now();
        if (timeLeft <= 0) {
            clearInterval(interval);
            return;
        }

        confetti({
            particleCount: 80,
            spread: 360,
            ticks: 60,
            origin: {
                x: Math.random(),
                y: Math.random() * 0.5, // parte superior
            },
            scalar: 1.2,
            startVelocity: 30,
            colors: ['#ff0000', '#00ffcc', '#ffd700', '#ffffff', '#bb00ff'],
        });
    }, 500);

    // Ocultar mensaje después del tiempo
    setTimeout(() => {
        mensaje.remove();
    }, duration);
}
