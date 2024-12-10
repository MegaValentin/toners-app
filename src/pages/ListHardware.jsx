import React, { useState, useEffect } from "react"
import axios from "axios"
import IconDownload from "../components/Icons/IconDownload"
import IconDelete from "../components/Icons/IconDelete"
import IconChek from "../components/Icons/IconCheck"

const ListHardware = () => {
    const [hardware, setHardware] = useState([])
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/hardware/${id}`, {
                withCredentials: true
            })

            setHardware(hardware.filter((orderHardware) => orderHardware._id !== id));

        } catch (error) {

            console.error("Error deleting order: ", error)
        }
    }

    const handleOrderHardware = async (orderId) => {
        try {
            await axios.put(`${apiUrl}/api/hardware/${orderId}/confirm`, {},
                { withCredentials: true, })

            const response = await axios.get(`${apiUrl}/api/hardwares`, {
                withCredentials: true
            })

            setHardware(response.data)
            setConfirmationMessage("Hardware Entregado")
            setTimeout(() => setConfirmationMessage(""), 1500)

            setErrorMessage("")

        } catch (error) {
            console.error("Error markin order as delivered: ", error)
            setErrorMessage(error.response?.data?.message || "Error marking order as deliver")
            setTimeout(() => setErrorMessage(""), 1500)
        }
    }

    const handleDownloadDoc = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/api/hardware/${id}/doc`,{
                responseType: 'blob',
                withCredentials:true
            })

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `Orden_${id}.pdf`)
            document.body.appendChild(link)
            link.click()
            link.remove()

        } catch (error) {
            console.error("Error downloading PDF: ", error);
        }
    }

    const filteredHardware = hardware.filter(orderHardware => !orderHardware.confirm)
    const filteredConfirmHardware = hardware.filter(orderHardware => orderHardware.confirm)

    const openModal = (action, id) => {
        setCurrentAction({ action, id });
        setShowModal(true);
    };

    const confirmAction = () => {
        if (currentAction.action === "delete") {
            handleDelete(currentAction.id);
        } else if (currentAction.action === "confirm") {
            handleOrderHardware(currentAction.id);
        }
        setShowModal(false);
    };


    return (
        <div className="bg-transparent  rounded-lg w-full mt-10 ">
            {hardware.length === 0 ? (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md" role="alert">
                    <p className="font-semibold">No hay ordenes aún.</p>
                </div>
            ) : <>

                <h4 className="text-center text-2xl font-bold mb-6">Hardware Solicitado</h4>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 relative h-full mb-3 ">
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
                    {filteredHardware.map((orderHardware) => (
                        <li key={orderHardware._id} className="pb-3 sm:pb-4 mt-3 mr-4">
                            <div className="bg-gray-200 p-5 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-96">
                                <div className="flex-1 min-w-0">
                                    <strong>{orderHardware.areaName}</strong>
                                    <ul className="list-disc list-inside text-gray-900 mt-2">
                                        {Array.isArray(orderHardware.hardware)
                                            ? orderHardware.hardware.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))
                                            : typeof orderHardware.hardware === "string"
                                                ? orderHardware.hardware.split(",").map((item, index) => (
                                                    <li key={index}>{item.trim()}</li>
                                                ))
                                                : (
                                                    <li>{orderHardware.hardware || "No hay hardware disponible"}</li>
                                                )}
                                    </ul>
                                    <p className="text-grat-900 mt-2">{orderHardware.description}</p>
                                    <p className="text-gray-600 mt-4"> Creada: {orderHardware.fecha}</p>


                                </div>
                                <div className="inline-flex items-center text-base font-semibold gap-4">
                                    {!orderHardware.confirm && (
                                        <>

                                            <button
                                                onClick={() => openModal("confirm", orderHardware._id)}
                                                className="text-green-700 hover:text-green-500"
                                            >
                                                <IconChek />
                                            </button>
                                            <button
                                                onClick={() => handleDownloadDoc(orderHardware._id)}
                                                className="text-blue-700 hover:text-blue-500"
                                            >
                                                <IconDownload />
                                            </button>
                                            <button
                                                onClick={() => openModal("delete", orderHardware._id)}
                                                className="text-red-700 hover:text-red-500"
                                            >
                                                <IconDelete />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}

                </ul>


                <ul className="divide-y divide-gray-200 dark:divide-gray-700 relative h-full mb-3 ">
                    <h4 className="text-center text-2xl font-bold mb-6">Hardware Solicitado Entregado</h4>
                    {filteredConfirmHardware.map((confirmHardware) => (
                        <li key={confirmHardware._id} className="pb-3 sm:pb-4 mt-3 mr-4">
                            <div className="bg-gray-200 p-5 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-96">
                                <div className="flex-1 min-w-0">
                                    <strong>{confirmHardware.areaName}</strong>
                                    <ul className="list-disc list-inside text-gray-900 mt-2">
                                        {Array.isArray(confirmHardware.hardware)
                                            ? confirmHardware.hardware.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))
                                            : typeof confirmHardware.hardware === "string"
                                                ? confirmHardware.hardware.split(",").map((item, index) => (
                                                    <li key={index}>{item.trim()}</li>
                                                ))
                                                : (
                                                    <li>{confirmHardware.hardware || "No hay hardware disponible"}</li>
                                                )}
                                    </ul>
                                    <p className="text-grat-900 mt-2">{confirmHardware.description}</p>



                                </div>
                                <div className="inline-flex items-center text-base font-semibold gap-4">
                                    {confirmHardware.confirm && (
                                        <>
                                            <button
                                                onClick={() => openModal("delete", confirmHardware._id)}
                                                className="text-red-700 hover:text-red-500"
                                            >
                                                <IconDelete />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 space-y-4">
                            <h2 className="text-lg font-semibold">{currentAction.action === "delete" ? "¿Estas seguro de elimar esta orden?" : "Pedido de orden entregado"}</h2>

                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className={`px-4 py-2 rounded hover:opacity-90 ${currentAction.action === "delete"
                                        ? "bg-red-600 text-white hover:bg-red-700"
                                        : "bg-green-600 text-white hover:bg-green-700"
                                        }`}
                                    onClick={confirmAction}
                                >
                                    {currentAction.action === "delete" ? "Eliminar" : "SI"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </>}
        </div>
    )
}

export default ListHardware