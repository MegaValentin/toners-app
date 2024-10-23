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
                await axios.put(`${apiUrl}/api/task/${selectedTask._id}/complete`, {
                    solucionDescripcion: solutionDesc,
                })
                setShowForm(false)
                setSolutionDesc("")
                setSelectedTask(null)

                const response = await axios.get(`${apiUrl}/api/mytasks`)
                setTasks(response.data)
            } catch (error) {
                console.error("Error al completar la tarea: ", error)
            }
        }
    }

    const inProgressTasks = tasks.filter((task) => task.estado === "en proceso")

    const completedTasks = tasks.filter((task) => task.estado === "finalizado")

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4">Mis tareas</h2>

            <h3 className="text-xl font-bold mb-2">Tareas en proceso</h3>

            <ul className="divide-y divide-gray-200 dark:divide-gray-700 relative h-full mb-3 max-h-96 overflow-y-auto custom-scrollbar">
                {inProgressTasks.map((task) => (
                    <li key={task._id} className="pb-3 sm:pb-4 mt-3 mr-4">
                        <div className="bg-gray-200 p-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-96">
                            <div className="flex-1 min-w-0">
                                <strong>{task.titulo}</strong>: {task.descripcion}
                            </div>
                            <div className="inline-flex items-center text-base font-semibold">

                                <button onClick={() => handleCompleteClick(task)}
                                    className="py-2 px-4 bg-teal-500 hover:bg-teal-800 text-white font-semibold rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >Finalizar</button>

                            </div>

                        </div>
                    </li>
                ))}
            </ul>

            {showForm && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
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
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                            >Enviar</button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Cancelar</button>

                        </div>
                    </form>
                </div>
            )}

            <h3 className="text-xl font-bold mt-8 mb-2">Tareas finalizadas</h3>
            <ul className="space-y-4">
                {completedTasks.map((task) => (
                    <li key={task._id} className="bg-gray-200 p-4 rounded-lg shadow-md">
                        <strong className="text-lg font-semibold">{task.titulo}</strong>: {task.descripcion}
                        <br />
                        <em className="text-gray-600">Solucion: {task.solucionDescripcion}</em>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MyTasks