import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const TaskList = () => {
    const { user } = useContext(AuthContext); 
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState(null)
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
            
            setMessage({ type: "success", text: "Tarea asignada exitosamente" })
                setTimeout(() => {
                    setMessage("")
                }, 1000)
            setTasks(tasks.map(task =>
                task._id === taskId ? { ...task, estado: "en proceso", usuarioAsignado: user.username } : task
            ));
        } catch (error) {
            if (error.response) {
                alert(`Hubo un error: ${error.response.data.error}`);
            } else {
                setMessage({ type: "success", text: "Hubo un error al asignar la tarea." })
                setTimeout(() => {
                    setMessage("")
                }, 1000)
            }
        }
    };

    const unassignedTasks = tasks.filter(task => task.estado === "pendiente" && !task.usuarioAsignado);

    return (
        <div className="bg-transparent p-8 rounded-lg w-full mt-10 ">
            {unassignedTasks.length > 0 ? (
                <>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Lista de Tareas</h2>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 relative h-full mb-3 max-h-96 overflow-y-auto custom-scrollbar">
                    {unassignedTasks.map((task) => (
                        <li key={task._id} className="pb-3 sm:pb-4 mt-3 mr-4">
                            <div className=" flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-96">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-semibold text-gray-800">{task.titulo}</h3>
                                    <p className="text-gray-900 mt-2">{task.areaName}</p>
                                    <p className="text-gray-600 mt-4">{task.descripcion}</p>
                                    <p className="text-gray-600 "> Tarea agregada el: {task.fechaCreacion}</p>

                                </div>
                                <div className="inline-flex items-center text-base font-semibold">
                                    <button
                                        className="py-2 px-4 bg-teal-500 hover:bg-teal-800 text-white font-semibold rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        onClick={() => handleAssign(task._id)}
                                    >
                                        Asignarme
                                    </button>

                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                </>
            ) : (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md" role="alert">
                    <p className="font-semibold">No hay tareas pendientes aún.</p>
                </div>
            )}

        </div>
    );
}

export default TaskList;

