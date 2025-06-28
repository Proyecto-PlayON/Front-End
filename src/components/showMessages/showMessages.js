export function showMessage(message, type = 'success') {
  const container = document.getElementById('alert-container');

  const alert = document.createElement('div');
  alert.className = `alert alert-${type} alert-dismissible fade show mb-2 text-center`;
  alert.role = 'alert';
  alert.style.minWidth = '300px';
  alert.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
  alert.style.pointerEvents = 'auto'; // permite clic en el botón cerrar
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  container.appendChild(alert);

  // Autoeliminar tras 3 segundos
  setTimeout(() => {
    alert.classList.remove('show');
    alert.classList.add('hide');

    setTimeout(() => {
      alert.remove();
    }, 500);
  }, 3000);
}
