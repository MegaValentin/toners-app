import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/tasks`, {
                    withCredentials: true,
                });
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
                { username: 'your-username' }, // Asegúrate de enviar el username aquí
                {
                    withCredentials: true,
                }
            );
            alert('Tarea asignada exitosamente');
            setTasks(tasks.map(task =>
                task._id === taskId ? { ...task, estado: "en proceso", usuarioAsignado: 'your-username' } : task
            ));
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                console.error('Error al asignar la tarea:', error.response.data);
                alert(`Hubo un error: ${error.response.data.error}`);
            } else {
                console.error('Error al asignar la tarea:', error);
                alert('Hubo un error al asignar la tarea.');
            }
        }
    };

    const unassignedTasks = tasks.filter(task => task.estado === "pendiente" && !task.usuarioAsignado);

    return (
        <div className="bg-white p-8 rounded-lg w-full mt-10 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Lista de Tareas</h2>
            {unassignedTasks.length > 0 ? (
                <ul className="space-y-4">
                    {unassignedTasks.map((task) => (
                        <li key={task._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800">{task.titulo}</h3>
                            <p className="text-gray-600 mb-4">{task.descripcion}</p>
                            <button 
                                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
        </div>
    );
}

export default TaskList;
