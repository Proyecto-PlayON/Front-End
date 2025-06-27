export async function fetchConToken(url, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await fetch(url, { ...options, headers });
        const contentType = response.headers.get('content-type');

        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } 
        else {
            const text = await response.text();
            throw new Error(text);
        }

        if (!response.ok) {
            if (response.status === 401) {
                alert('Sesión expirada. Volvé a iniciar sesión.');
                window.location.href = '/login.html';
                return null;
            }
            throw new Error(data.message || 'Ocurrió un error inesperado');
        }

        return data;

    }
    catch (error) {
        console.error('fetchConToken Error:', error);
        alert(error.message || 'Error de conexión con el servidor');
        return null;
    }
}