import setupLoginFormHandler from "../components/userLoginFormModal.js";



   
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente cargado. Activando login handler...");
  const form = document.getElementById("loginForm");
  form.querySelector("button[type=submit]").addEventListener("click", () => console.log("Click submit"));
form.addEventListener("submit", () => console.log("Listener manual activado"));
  setupLoginFormHandler();
});
     

