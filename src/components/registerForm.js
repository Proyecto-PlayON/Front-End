import registerApi from "../services/registerServices.js";
export const RegisterForm = () => {
    const registerForm = document.getElementById("registerForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const user = {
            userName: usernameInput.value,
            password: passwordInput.value,
            name: nameInput.value,
            email: emailInput.value,
        };

        try {
            const result = await registerApi.Post(user);
            if (result.success) {
                alert("Registration successful!");
                // Redirect or perform further actions
                window.location.href = "login.html";
            } else {
                alert("Registration failed: " + result.message);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration.");
        }
    });
};