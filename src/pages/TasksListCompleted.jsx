import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaksListCompleted = () => {
    const [tasks, setTasks] = useState([])
    const [areas, setAreas] = useState([]);
    const [ users, setUsers ] = useState([])
    const [selectedArea, setSelectedArea] = useState('');
    const [ selectedUser, setSelectedUser ] = useState('')
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/tasks`, { withCredentials: true });
                setTasks(response.data);
                setAreas([...new Set(response.data.map(task => task.areaName))]);
                setUsers([...new Set(response.data.map(task => task.usuarioAsignado))])

            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
        fetchTasks();
    }, [])

    const handleDownloadReport = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/tasks/report`, {
                responseType: 'blob',
                withCredentials: true
            })

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')

            link.href = url
            link.setAttribute('download', 'Reporte_Tareas.xls')
            document.body.appendChild(link)
            link.click()
        } catch (error) {
            console.error("Error downloading report: ", error)
        }
    }

    const inCompletedTasks = tasks
        .filter(task => task.estado === "finalizado")
        .filter(task => (selectedArea ? task.areaName === selectedArea : true))
        .filter(task => (selectedUser ? task.usuarioAsignado === selectedUser : true));

    return (
        <div className="bg-transparent p-8 rounded-lg w-full mt-10 ">
            <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Tareas Finalizadas</h2>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
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
                    <option value="">Usuario</option>
                    {users.map(user => (
                        <option key={user} value={user}>{user}</option>
                    ))}
                </select>
            </div>


            {inCompletedTasks.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 relative h-full mb-3 max-h-96 overflow-y-auto custom-scrollbar">
                    {inCompletedTasks.map((task) => (
                        <li key={task._id} className="pb-3 sm:pb-4 mt-3 mr-4">
                            <div className="bg-gray-200 p-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-96">
                                <div className="flex-1 min-w-0">
                                    <strong className="text-lg font-semibold">{task.titulo}</strong>: {task.descripcion}
                                    <br />
                                    <em className="text-gray-600">Solucion: {task.solucionDescripcion}</em>
                                    <p className="text-gray-900 mt-2">{task.areaName}</p>
                                    <p className="text-gray-600 mt-4"> Tarea creada el: {task.fechaCreacion}</p>
                                    <p className="text-gray-600"> Tarea finalizada el: {task.fechaFinalizacion}</p>

                                </div>
                                <div className="inline-flex items-center text-base font-semibold">

                                    <p className="text-sm font-medium truncate">
                                        Asignado a: <span className="text-blue-600">{task.usuarioAsignado}</span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md" role="alert">
                    <p className="font-semibold">Ninguna tarea se finalizo aún.</p>
                </div>
            )}

            <div className="mt-4 flex justify-center">
                <button
                    onClick={handleDownloadReport}
                    className="w-full sm:w-1/2 bg-teal-500 hover:bg-teal-800 hover:border hover:border-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md"
                >
                    Descargar Reporte
                </button>
            </div>

        </div>
    );

}

export default TaksListCompleted;