import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InProgressTaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [areas, setAreas] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/tasks`, { withCredentials: true });
                setTasks(response.data);
                setAreas([...new Set(response.data.map(task => task.areaName))]);
                setUsers([...new Set(response.data.map(task => task.usuarioAsignado))]);
                setCategories([...new Set(response.data.map(task => task.titulo))]);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
        fetchTasks();
    }, []);

    // Filtra las tareas "en proceso" y "pendiente"
    const filteredTasks = tasks
        .filter(task => task.estado === "en proceso" || task.estado === "pendiente")
        .filter(task => (selectedArea ? task.areaName === selectedArea : true))
        .filter(task => (selectedUser ? task.usuarioAsignado === selectedUser : true))
        .filter(task => (selectedCategory ? task.titulo === selectedCategory : true))
        // Ordena para que las tareas "pendiente" aparezcan primero
        .sort((a, b) => (a.estado === "pendiente" ? -1 : 1));

    return (
        <div className="bg-transparent p-8 rounded-lg w-full mt-10 ">
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="">Todas las Categorías</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                <select
                    value={selectedArea}
                    onChange={e => setSelectedArea(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="">Todas las Áreas</option>
                    {areas.map(area => (
                        <option key={area} value={area}>{area}</option>
                    ))}
                </select>

                <select
                    value={selectedUser}
                    onChange={e => setSelectedUser(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="">Todos los Usuarios</option>
                    {users.map(user => (
                        <option key={user} value={user}>{user}</option>
                    ))}
                </select>
            </div>

            {filteredTasks.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 relative h-full mb-3 max-h-96 ">
                    {filteredTasks.map((task) => (
                        <li key={task._id} className="pb-3 sm:pb-4 mt-3 mr-4">
                            <div className="bg-gray-200 p-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-96">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-semibold text-gray-800">{task.titulo}</h3>
                                    <p className="text-gray-900 mt-2">{task.areaName}</p>
                                    <p className="text-gray-600 mb-2">{task.descripcion}</p>
                                    <p className="text-gray-600 mt-4">Tarea creada el: {task.fechaCreacion}</p>
                                    <p className="text-gray-600">Tarea asignada el: {task.fechaInicio}</p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold">
                                    <p className="text-sm font-medium truncate">
                                        Asignado a: <span className="text-blue-600">
                                            {task.usuarioAsignado ? task.usuarioAsignado : "No hay usuario asignado"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md" role="alert">
                    <p className="font-semibold">No hay tareas en proceso o pendientes aún.</p>
                </div>
            )}
        </div>
    );
}

export default InProgressTaskList;
