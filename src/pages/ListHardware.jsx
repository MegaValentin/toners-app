import React, { useState, useEffect } from "react"
import axios from "axios"
import IconDownload from "../components/Icons/IconDownload"
import IconDelete from "../components/Icons/IconDelete"
import IconChek from "../components/Icons/IconCheck"

const ListHardware = () => {
    const [hardware, setHardware] = useState([])
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        const fetchHardware = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/hardwares`, {
                    withCredentials: true
                })
                setHardware(response.data)
            } catch (error) {
                console.error("Error fetching hardwares: ", error)
            }
        }
        fetchHardware()
    }, [])

    return (
        <div className="bg-transparent  rounded-lg w-full mt-10 ">
            {hardware.length === 0 ? (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md" role="alert">
                    <p className="font-semibold">No hay ordenes aún.</p>
                </div>
            ) : <>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 relative h-full mb-3 max-h-96 overflow-y-auto custom-scrollbar">
                    {hardware.map((orderHardware) => (
                        <li key={orderHardware._id} className="pb-3 sm:pb-4 mt-3 mr-4">
                            <div className="bg-gray-200 p-5 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-96">
                                <div className="flex-1 min-w-0">
                                    <strong>{orderHardware.hardware}</strong>
                                    <p className="text-gray-900 mt-2">{orderHardware.areaName}</p>
                                    <p className="text-grat-900 mt-2">{orderHardware.description}</p>
                                    <p className="text-gray-600 mt-4"> Creada: {orderHardware.fecha}</p>


                                </div>
                                <div className="inline-flex items-center text-base font-semibold gap-4">
                                    <button
                                        className="text-green-700 hover:text-green-500"
                                    >
                                        <IconChek/>
                                    </button>
                                    <button
                                        className="text-blue-700 hover:text-blue-500"
                                    >
                                        <IconDownload/>
                                    </button>
                                    <button
                                        className="text-red-700 hover:text-red-500"
                                    >
                                        <IconDelete/>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </>}
        </div>
    )
}

export default ListHardware