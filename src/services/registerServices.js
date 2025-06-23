

const Register = async (data) => {
    let result = {};
    try {
        const response = await fetch("https://localhost:7282/api/Register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            result = await response.json();
        } else {
            console.error("Error al registrar usuario: ", response.status);
        }
    } catch (error) {
        console.error("Error de red: ", error);
    }
    return result;
}

const registerApi = {
    Post: Register,
}
export default registerApi;






