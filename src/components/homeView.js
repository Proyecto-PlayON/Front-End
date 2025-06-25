export default function renderHomeView() {
  return `
    <section class="home-view">
      <div class="home-intro-box">
        <h2>Bienvenido a <span class="playon-title">PlayOn</span></h2>
        <p class="home-sub">La plataforma ideal para crear, organizar e impulsar tus torneos deportivos con estilo y precisión.</p>
      </div>

      <div class="home-grid">
        <div class="home-card">
          <h3>➕ Crear Torneo</h3>
          <p>Registrá un nuevo torneo con modalidad, cantidad de participantes y reglas personalizadas.</p>
        </div>

        <div class="home-card">
          <h3>🔍 Buscar</h3>
          <p>Explorá torneos existentes, filtrá por disciplina, buscá ganadores y consultá los puntos de cada partido.</p>
        </div>

        <div class="home-card">
          <h3>🎮 Iniciar Juego</h3>
          <p>Generá automáticamente los enfrentamientos, armá el fixture y seguí la evolución del ranking en tiempo real.</p>
        </div>

        <div class="home-card">
          <h3>🚪 Iniciar Sesión</h3>
          <p>Accedé a tu cuenta para gestionar tus torneos, editar datos, registrar resultados y mantener el control completo.</p>
        </div>
      </div>

      
    </section>
  `;
}
