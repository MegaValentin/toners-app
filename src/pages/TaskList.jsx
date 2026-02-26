import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconDelete from '../components/Icons/IconDelete';


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [userSelect, setUserSelect] = useState("");
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/tasks`, { withCredentials: true });
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false)
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/auth/getuser`, {
                withCredentials: true
            })
            setUsers(res.data)
        } catch (error) {
            console.error("Error cargando usuarios", error)
        }
    }

    useEffect(() => {
        fetchTasks();
        fetchUsers()
    }, []);


    const handleAssign = async () => {
        if (!selectedTask || !userSelect) return

        try {
            const user = users.find(u => u._id === userSelect)

            await axios.put(`${apiUrl}/api/task/${selectedTask}/assign`,
                { username: user.username },
                { withCredentials: true })

            setSelectedTask(null)
            setUserSelect("")
            fetchTasks()
        } catch (error) {
            console.error("Error asignado", e)
        }
    }

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

    if (loading) return <div>Cargando...</div>;

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
                                        
                                            {!task.usuarioAsignado && (
                                                <button
                                                    onClick={() => setSelectedTask(task._id)}
                                                    className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
                                                >
                                                    Asignar
                                                </button>
                                            )}
                                        
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
                    {selectedTask && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                            <div className="bg-white rounded-xl p-6 w-[95%] max-w-md space-y-4">

                                <h3 className="font-semibold">Asignar usuario</h3>

                                <select
                                    value={userSelect}
                                    onChange={(e) => setUserSelect(e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                >
                                    <option value="">Seleccione usuario</option>
                                    {users.map((u) => (
                                        <option key={u._id} value={u._id}>
                                            {u.username}
                                        </option>
                                    ))}
                                </select>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setSelectedTask(null)}
                                        className="px-3 py-2 bg-gray-200 rounded"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        onClick={handleAssign}
                                        className="px-3 py-2 bg-teal-600 text-white rounded"
                                    >
                                        Guardar
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

