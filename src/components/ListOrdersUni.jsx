import React, { useState, useEffect } from "react";
import axios from "axios";


const ListOrdersUni = () => {
    const [ordersuni, setOrdersUni] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        const fetchOrdersUni = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/orderuni`, {
                    withCredentials: true
                })
                setOrdersUni(response.data)

            } catch (error) {
                console.error("Error fetching orders: ", error)
            }
        }
        fetchOrdersUni()
    }, [])

    const handleDelivery = async (idOrder) => {
        try {
            await axios.put(`${apiUrl}/api/orderuni/${idOrder}/deliver`, {},
                {
                    withCredentials: true
                })
            const response = await axios.get(`${apiUrl}/api/orderuni`,
                { withCredentials: true })

            setOrdersUni(response.data)
            setConfirmationMessage("Orden Entregada")

            setTimeout(() => setConfirmationMessage(""), 1500)

            setErrorMessage("")

        } catch (error) {
            console.error("Error marking order as delivered: ", error)
            setErrorMessage(error.response?.data?.message || "Error canceling order");
            setTimeout(() => setErrorMessage(""), 1500)
        }
    }

    const handleCancelOrder = async (idOrder) => {
        try {
            await axios.delete(`${apiUrl}/api/removeuni/${idOrder}`,
                { withCredentials: true })

            const response = await axios.get(`${apiUrl}/api/orderuni`, {
                withCredentials: true
            })
            setOrdersUni(response.data)
            setConfirmationMessage("Orden Cancelada")

            setTimeout(() => setConfirmationMessage(""), 750)

            setErrorMessage("")

        } catch (error) {
            console.error("Error canceling order: ", error)
            setErrorMessage(error.response?.data?.message || "Error cancelin order")
            setTimeout(() => setErrorMessage(""), 1500)
        }
    }

    const filteredOrdersUni = ordersuni.filter(uni => !uni.isDelivered)

    return (
        <div className="flex justify-center">
            <ul className=" divide-y divide-gray-200 dark:divide-gray-700">
                {errorMessage && (
                    <div className="mb-4 text-red-500 text-center">
                        {errorMessage}
                    </div>
                )}
                {confirmationMessage && (
                    <div className="mb-4 text-green-500 text-center">
                        {confirmationMessage}
                    </div>
                )}

                {filteredOrdersUni.map((ordersuni) => (
                    <li key={ordersuni._id} className="pb-3 sm:pb-4 mt-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-44">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate"><strong>Unidad de Imagen:</strong> {ordersuni.uniName}</p>
                                <p className="text-sm font-medium text-gray-900 truncate"><strong>Area:</strong> {ordersuni.areaName}</p>
                                <p className="text-sm font-medium text-gray-900 truncate"><strong>Cantidad:</strong> {ordersuni.cantidad}</p>
                                <p className="text-sm font-medium text-gray-900 truncate"><strong>Fecha:</strong> {new Date(ordersuni.fecha).toLocaleString()}</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold">
                                <p className="text-sm font-medium text-gray-900 truncate"><strong>Estado:</strong> {ordersuni.isDelivered ? "Entregado" : "No Entregado"}</p>
                                {!ordersuni.isDelivered && (
                                    <>
                                        <button
                                            onClick={() => handleDelivery(ordersuni._id)}
                                            className="bg-teal-500 hover:bg-teal-900 text-white px-4 py-2 rounded ml-4"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l5 5l10 -10" /></svg>
                                        </button>
                                        <button
                                            onClick={() => handleCancelOrder(ordersuni._id)}
                                            className="bg-red-500 hover:bg-red-900 text-white px-4 py-2 rounded ml-4"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListOrdersUni