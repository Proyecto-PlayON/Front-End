import { getUsers } from "../services/userApi.js";

export default function LoginForm({ onLogin }) {
  const html = `
    <h2>Iniciar Sesión</h2>
    <form id="loginForm" class="login-form">

  <div class="input-group">
    <label for="username">Usuario:</label>
    <div class="user-selector">
      <input type="text" id="username" name="username" autocomplete="off" required />
      <ul id="user-list" class="user-list" style="display:none;"></ul>
    </div>
  </div>

  <div class="input-group">
    <label for="password">Contraseña:</label>
    <input type="password" id="password" name="password" value="1234" readonly />
  </div>

  <button type="submit">Ingresar</button>

</form>

  `;

  function addListeners(container) {
    const usernameInput = container.querySelector("#username");
    const userList = container.querySelector("#user-list");
    const loginForm = container.querySelector("#loginForm");

    usernameInput.addEventListener("click", async () => {
      userList.innerHTML = "";
      const users = await getUsers();
      if (users.length === 0) {
        userList.style.display = "none";
        return;
      }

      users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = user.name;
        li.className = "user-list-item";
        li.onclick = () => {
          usernameInput.value = user.name;
          usernameInput.dataset.user = JSON.stringify(user);
          userList.style.display = "none";
        };
        userList.appendChild(li);
      });

      userList.style.display = "block";
    });

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = usernameInput.value.trim();
      const password = container.querySelector("#password").value;
      const userData = usernameInput.dataset.user;

      if (username !== "" && password === "1234" && userData) {
        const user = JSON.parse(userData);
        console.log("Usuario logueado:", user);
        onLogin(user);
      } else {
        alert("Usuario o contraseña incorrectos. Intenta nuevamente.");
      }
    });
  }

  return { html, addListeners };
}