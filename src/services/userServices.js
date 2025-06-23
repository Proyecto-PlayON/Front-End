
const Login = async (user) => {
    let result = {};
    try {
        const response = await fetch("https://localhost:7282/api/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const contentType = response.headers.get("Content-Type");

            let token = null;

            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
              
                token = data.Token || data.token;
            } else {
               
                const rawText = await response.text();
          
                if (rawText.split(".").length === 3) {
                    token = rawText;
                }
            }

            if (token) {
                localStorage.setItem("token", token);
                result = { success: true };
            } else {
                result = { success: false, message: "No se recibió un token válido del servidor." };
            }
        } else {
            const errorText = await response.text();
            result = { success: false, message: errorText };
        }
    } catch (error) {
        console.error("Error de red: ", error);
        result = { success: false, message: "Error de red o conexión con el servidor." };
    }

    return result;
};

const userApi = {
    Post: Login,
};
export default userApi;


//const getUsers = async () => {
// let result = [];
// try {
//  const response = await fetch("https://localhost:7083/api/User");
// if (response.ok) {
//  result = await response.json();
// } else {
//  console.error("Error al obtener usuarios: ", response.status);
//}
//} catch (error) {
// console.error("Error de red: ", error);
// }
//return result;
// };
