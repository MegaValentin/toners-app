import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InProgressTaskList = () => {
    const [tasks, setTasks] = useState([])
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(()=>{
        const fetchTasks = async () =>{
            try {
                const response = await axios.get(`${apiUrl}/api/tasks`, { withCredentials: true });
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
        fetchTasks();
    },[])
    
    const inProgressTasks = tasks.filter(task => task.estado === "en proceso");

    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Tareas en Proceso</h2>
            {inProgressTasks.length > 0 ? (
                <ul className="space-y-4">
                    {inProgressTasks.map((task) => (
                        <li key={task._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800">{task.titulo}</h3>
                            <p className="text-gray-600 mb-2">{task.descripcion}</p>
                            <p className="text-gray-600 font-semibold">
                                Asignado a: <span className="text-blue-600">{task.usuarioAsignado}</span>
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-700 mt-4">No hay tareas en proceso.</p>
            )}
        
        </>
    );
    
}

export default InProgressTaskList;