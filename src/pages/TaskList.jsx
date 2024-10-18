import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Ruta donde tengas definido el contexto de autenticación

const TaskList = () => {
    const { user } = useContext(AuthContext); // Supongamos que el contexto de autenticación contiene la información del usuario logueado
    const [tasks, setTasks] = useState([]);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/tasks`, { withCredentials: true });
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    const handleAssign = async (taskId) => {
        try {
            const response = await axios.put(
                `${apiUrl}/api/task/${taskId}/assign`,
                { username: user.username }, // Aquí usamos el nombre de usuario del contexto
                { withCredentials: true }
            );
            alert('Tarea asignada exitosamente');
            setTasks(tasks.map(task =>
                task._id === taskId ? { ...task, estado: "en proceso", usuarioAsignado: user.username } : task
            ));
        } catch (error) {
            if (error.response) {
                alert(`Hubo un error: ${error.response.data.error}`);
            } else {
                alert('Hubo un error al asignar la tarea.');
            }
        }
    };

    const unassignedTasks = tasks.filter(task => task.estado === "pendiente" && !task.usuarioAsignado);

    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Lista de Tareas</h2>
            {unassignedTasks.length > 0 ? (
                <ul className="space-y-4">
                    {unassignedTasks.map((task) => (
                        <li key={task._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800">{task.titulo}</h3>
                            <p className="text-gray-600 mb-4">{task.descripcion}</p>
                            <button 
                                className="py-2 px-4 bg-teal-500 hover:bg-teal-800 text-white font-semibold rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-300"
                                onClick={() => handleAssign(task._id)}
                            >
                                Asignarme
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-700 mt-4">No hay tareas pendientes.</p>
            )}
        
        </>
    );
}

export default TaskList;

