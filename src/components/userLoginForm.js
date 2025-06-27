import userApi from "../services/userServices.js";
export const UserLoginForm = () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const user = {
            userName: usernameInput.value,
            password: passwordInput.value,
        };

        try {
            const result = await userApi.Post(user);
            if (result.success) {
                alert("Login successful!");
                // Redirect or perform further actions
                window.location.href = "tournamentFigma.html";
            } else {
                alert("Login failed: " + result.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login.");
        }
    });
};