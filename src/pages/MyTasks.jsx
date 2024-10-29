import React, { useState, useEffect } from "react"
import axios from "axios"

const MyTasks = () => {
    const [tasks, setTasks] = useState([])
    const [solutionDesc, setSolutionDesc] = useState("")
    const [selectedTask, setSelectedTask] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/mytasks`, { withCredentials: true })
                setTasks(response.data)
            } catch (error) {
                console.error("Error al obtener las tareas: ", error)
            }
        }
        fetchTasks()
    }, [])

    const handleCompleteClick = (tasks) => {
        setSelectedTask(tasks)
        setShowForm(true)
    }

    const handleSolutionChange = (e) => {
        setSolutionDesc(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (selectedTask) {
            try {
                await axios.put(
                    `${apiUrl}/api/task/${selectedTask._id}/complete`,
                    { solucionDescripcion: solutionDesc },
                    { withCredentials: true }
                )
                setShowForm(false)
                setSolutionDesc("")
                setSelectedTask(null)

                // Actualizar la lista de tareas después de completar
                const response = await axios.get(`${apiUrl}/api/mytasks`, { withCredentials: true })
                setTasks(response.data)
            } catch (error) {
                console.error("Error al completar la tarea: ", error)
            }
        }
    }

    const handleRevertClick = async (taskId) => {
        try {
            console.log(`Revirtiendo tarea con ID: ${taskId}`);
            const response = await axios.put(`${apiUrl}/api/task/${taskId}/revert`, {}, { withCredentials: true });

            if (response.status === 200) {
                alert("La tarea ha sido revertida a pendiente.");
                // Actualizar la lista de tareas
                const tasksResponse = await axios.get(`${apiUrl}/api/mytasks`, { withCredentials: true });
                setTasks(tasksResponse.data);
            } else {
                console.error("No se pudo revertir la tarea.");
                alert("No se pudo revertir la tarea.");
            }
        } catch (error) {
            console.error("Error al revertir el estado de la tarea:", error);
            alert("Error al revertir el estado de la tarea.");
        }
    };

    const completedTasks = tasks.filter((task) => task.estado === "finalizado")

    const inProgressTasks = tasks.filter((task) => task.estado === "en proceso")


    return (
        <div className="bg-transparent  rounded-lg w-full mt-10 ">
            <h2 className="text-3xl font-semibold mb-4">Mis tareas</h2>

            {inProgressTasks.length === 0 ? (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md" role="alert">
                    <p className="font-semibold">No tenes tareas en proceso aún.</p>
                </div>

            ) :
                <>
                    <h3 className="text-xl font-bold mb-2">Tareas en proceso</h3>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700 relative h-full mb-3 max-h-96 overflow-y-auto custom-scrollbar">
                        {inProgressTasks.map((task) => (
                            <li key={task._id} className="pb-3 sm:pb-4 mt-3 mr-4">
                                <div className="bg-gray-200 p-5 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-96">
                                    <div className="flex-1 min-w-0">
                                        <strong>{task.titulo}</strong>: {task.descripcion}
                                        <p className="text-gray-600 mt-4"> Tarea creada el: {task.fechaCreacion}</p>

                                        <p className="text-gray-600 "> Tarea asisgnada el: {task.fechaInicio}</p>

                                    </div>

                                    <div className="inline-flex items-center text-base font-semibold gap-4">
                                        <button
                                            onClick={() => handleRevertClick(task._id)}
                                            className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        >
                                            Revertir a pendiente
                                        </button>
                                        <button
                                            onClick={() => handleCompleteClick(task)}
                                            className="py-2 px-4 bg-teal-500 hover:bg-teal-800 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        >
                                            Finalizar
                                        </button>
                                    </div>


                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            }

            {showForm && (
                <div className="mt-6 p-4 bg-gray-100 bg-gray-200 ">
                    <h4 className="text-lg font-semibold mb-2">Finalizar tarea: {selectedTask?.titulo}</h4>
                    <form onSubmit={handleSubmit}>
                        <label className="block mb-2">
                            Descripcion de la solucion:
                            <textarea
                                value={solutionDesc}
                                onChange={handleSolutionChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                                required
                            />
                        </label>
                        <div className="flex gap-4 mt-4">
                            <button type="submit"
                                className="py-2 px-4 bg-teal-500 hover:bg-teal-800 text-white font-semibold rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >Enviar</button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="py-2 px-4 bg-red-500 hover:bg-red-800 text-white font-semibold rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-300">Cancelar</button>

                        </div>
                    </form>
                </div>
            )}

            <h3 className="text-xl font-bold mt-8 mb-2">Tareas finalizadas</h3>
            {completedTasks.length === 0 ? (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md" role="alert">
                    <p className="font-semibold">No tenes tareas finalizadas aún.</p>
                </div>
            ) : (
                <ul className="space-y-4">
                    {completedTasks.map((task) => (
                        <li key={task._id} className="bg-gray-200 p-4 rounded-lg shadow-md">
                            <strong className="text-lg font-semibold">{task.titulo}</strong>: {task.descripcion}
                            <br />
                            <em className="text-gray-600">Solucion: {task.solucionDescripcion}</em>
                            <p className="text-gray-600 mt-4"> Tarea creada el: {task.fechaCreacion}</p>
                            <p className="text-gray-600 "> Tarea finalizada el: {task.fechaFinalizacion}</p>

                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}

export default MyTasks