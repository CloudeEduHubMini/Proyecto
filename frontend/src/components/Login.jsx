import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    // Estado para saber si estamos en modo Login o Registro
    const [isRegistering, setIsRegistering] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. CONFIGURACIÓN DE LA URL REAL (NGROK)
        const baseUrl = 'https://nonfragmented-nonconducive-kit.ngrok-free.dev/api';

        // Nota: Tu amigo solo configuró /login por ahora. 
        // El registro fallará hasta que él agregue la ruta '/register' en su backend.
        const endpoint = isRegistering
            ? `${baseUrl}/register`
            : `${baseUrl}/login`;

        const userData = isRegistering
            ? { name, email, password }  // Datos para registro
            : { email, password };       // Datos para login

        try {
            // 2. CONEXIÓN REAL AL BACKEND
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true' // <--- CRÍTICO PARA NGROK
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                // ¡Éxito! Laravel nos dejó pasar
                console.log("Login exitoso:", data);

                // Le avisamos a App.jsx que ya entramos y le pasamos los datos del usuario
                onLogin(data.user);
            } else {
                // Error (Contraseña mal o usuario no existe)
                alert("Error: " + (data.message || "Credenciales incorrectas"));
            }

        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el Backend. ¿Está prendido Ngrok?");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
                    {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* El campo Nombre solo se muestra si estamos Registrando */}
                    {isRegistering && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Tu Nombre"
                                required={isRegistering} // Solo requerido si estamos registrando
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="n.control@itsx.edu.mx"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="********"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                    >
                        {isRegistering ? 'Registrarse' : 'Ingresar'}
                    </button>
                </form>

                {/* Switch para cambiar entre Login y Registro */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
                        <button
                            onClick={() => setIsRegistering(!isRegistering)}
                            className="text-blue-500 font-bold ml-1 hover:underline focus:outline-none"
                        >
                            {isRegistering ? 'Inicia Sesión' : 'Regístrate aquí'}
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;