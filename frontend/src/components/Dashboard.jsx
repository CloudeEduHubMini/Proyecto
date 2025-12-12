import React, { useState, useEffect } from 'react';

const Dashboard = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [metrics, setMetrics] = useState({ cpu: 0, ram: 0, latency: '0ms', status: 'Loading' });

    // --- URL BASE DE NGROK (Cámbiala si tu amigo reinicia Ngrok) ---
    const API_URL = 'https://nonfragmented-nonconducive-kit.ngrok-free.dev';

    useEffect(() => {
        if (!user) return;

        // 1. Cargar Tareas
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${API_URL}/tasks?user_id=${user.id}`, {
                    method: 'GET',
                    headers: { 'ngrok-skip-browser-warning': 'true', 'Content-Type': 'application/json' }
                });
                if (response.ok) {
                    const data = await response.json();
                    setTasks(data);
                }
            } catch (error) { console.error("Error tasks:", error); }
        };

        // 2. Cargar Métricas
        const fetchMetrics = async () => {
            try {
                const response = await fetch(`${API_URL}/metrics`, {
                    method: 'GET',
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                if (response.ok) {
                    const data = await response.json();
                    setMetrics(data);
                }
            } catch (error) { console.error("Error metrics:", error); }
        };

        fetchTasks();
        fetchMetrics();
        const interval = setInterval(fetchMetrics, 5000);
        return () => clearInterval(interval);

    }, [user]);

    // --- CREAR (POST) ---
    const handleCreateTask = async () => {
        const title = prompt("¿Qué tarea quieres agregar?");
        if (!title) return;

        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
                body: JSON.stringify({ title, status: 'Pending', user_id: user.id })
            });

            if (response.ok) {
                const newTask = await response.json();
                setTasks([...tasks, newTask]);
                alert("¡Tarea guardada!");
            }
        } catch (error) { console.error("Error enviando:", error); }
    };

    // --- EDITAR TEXTO (PUT) ---
    const handleEditTitle = async (task) => {
        const newTitle = prompt("Editar nombre de la tarea:", task.title);
        if (!newTitle || newTitle === task.title) return;

        try {
            // Enviamos PUT a /tasks/{id}
            await fetch(`${API_URL}/tasks/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
                body: JSON.stringify({ title: newTitle })
            });

            // ACTUALIZAMOS LOCALMENTE (Sin duplicar)
            setTasks(tasks.map(t =>
                t.id === task.id ? { ...t, title: newTitle } : t
            ));

        } catch (error) { console.error("Error editando:", error); }
    };

    // --- CAMBIAR ESTADO (PUT) ---
    const handleToggleStatus = async (task) => {
        const newStatus = task.status === 'Pending' ? 'Done' : 'Pending';

        try {
            await fetch(`${API_URL}/tasks/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
                body: JSON.stringify({ status: newStatus })
            });

            setTasks(tasks.map(t =>
                t.id === task.id ? { ...t, status: newStatus } : t
            ));
        } catch (error) { console.error("Error actualizando:", error); }
    };

    // --- BORRAR (DELETE) ---
    const handleDeleteTask = async (id) => {
        if (!confirm("¿Seguro que quieres borrar esta tarea?")) return;

        try {
            await fetch(`${API_URL}/tasks/${id}`, {
                method: 'DELETE',
                headers: { 'ngrok-skip-browser-warning': 'true' }
            });
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) { console.error("Error borrando:", error); }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <aside className="w-64 bg-blue-900 text-white p-6">
                <h1 className="text-2xl font-bold mb-8">CloudEduHub Mini</h1>
                <div className="mb-6 text-sm bg-blue-800 p-2 rounded">
                    Hola, <strong>{user ? user.name : 'Usuario'}</strong>
                </div>
                <nav>
                    <ul>
                        <li className="mb-4 cursor-pointer hover:text-blue-300">Inicio</li>
                        <li className="mb-4 cursor-pointer hover:text-blue-300 font-bold underline">Tareas</li>
                        <li className="mb-4 cursor-pointer hover:text-blue-300">Métricas</li>
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800">Panel de Control Educativo</h2>
                    <div className="bg-white p-3 rounded shadow-sm text-sm">
                        Status: <span className="text-green-500 font-bold">Conectado (Ngrok)</span>
                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                        <h3 className="text-gray-500 text-sm font-medium uppercase">Uso de CPU</h3>
                        <p className="text-3xl font-bold text-blue-900">{metrics.cpu || 0}%</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                        <h3 className="text-gray-500 text-sm font-medium uppercase">Latencia</h3>
                        <p className="text-3xl font-bold text-green-900">{metrics.latency || '0ms'}</p>
                    </div>
                </section>

                <section className="bg-white p-8 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-gray-700">Gestor de Tareas</h3>
                    {tasks.length === 0 ? (
                        <p className="text-gray-400 italic">No tienes tareas. ¡Crea una!</p>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {tasks.map(task => (
                                <li key={task.id} className="py-4 flex justify-between items-center">
                                    <span className="font-medium text-gray-700">{task.title}</span>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => handleToggleStatus(task)}
                                            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${task.status === 'Done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {task.status}
                                        </button>
                                        <button onClick={() => handleEditTitle(task)} className="text-blue-500 font-bold px-2" title="Editar">✏️</button>
                                        <button onClick={() => handleDeleteTask(task.id)} className="text-red-400 font-bold px-2" title="Borrar">🗑️</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button onClick={handleCreateTask} className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                        + Nueva Tarea
                    </button>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;