import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import IconDelete from '../components/Icons/IconDelete';
import IconUserAssing from '../components/Icons/IconUserAssing';

const TaskList = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/task/${id}`, {
                withCredentials: true
            })

            setTasks(tasks.filter((task) => task._id !== id))
        } catch (error) {
            console.error("Error deleting task: ", error)
        }
    }

    const openModal = (id) => {
        setCurrentAction({ id });
        setShowModal(true);
    };

    const confirmAction = () => {
        handleDelete(currentAction.id);
        setShowModal(false);

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
                                            className="py-2 px-4 text-teal-500 hover:text-teal-800  font-semibold rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-300"
                                            onClick={() => handleAssign(task._id)}
                                        >
                                            <IconUserAssing />
                                        </button>
                                        <button
                                            onClick={() => openModal(task._id)}
                                            className="text-red-700 hover:text-red-500"
                                        >
                                            <IconDelete />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white rounded-lg p-6 space-y-4">
                                <h2 className="text-lg font-semibold">¿Estas seguro de elimar esta tarea?</h2>

                                <div className="flex justify-end gap-4">
                                    <button
                                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded hover:opacity-90 bg-red-600 text-white hover:bg-red-700"
                                        onClick={confirmAction}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
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

