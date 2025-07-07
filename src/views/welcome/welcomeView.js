  import { setupLoginFormHandler } from "../../components/loginModal/loginModalComponent.js";

export async function welcomeView(){
    
    const container = document.createElement('section');
    container.classList.add('content');

    // Cargar el HTML de la página
    const htmlResponse = await fetch('./views/welcome/welcomeView.html');
    const htmlContent = await htmlResponse.text();
    container.innerHTML = htmlContent;
    const body = document.body;


if (!document.querySelector('.video-background')) {
    body.insertAdjacentHTML('afterbegin', `
      <video class="video-background" autoplay muted loop playsinline>
        <source src="assets/img/videoFondo.mp4" type="video/mp4">
      </video>
      <div class="overlay"></div>
    `);
  }

  
  //para abrir el login al hacer click en los card
  setTimeout(() => {
    const cards = container.querySelectorAll('.home-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        console.log("entro");
        setupLoginFormHandler();
      });
    });
  }, 0);
    return container;
} 