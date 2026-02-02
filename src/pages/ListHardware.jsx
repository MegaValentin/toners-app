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
            setConfirmationMessage("Orden Entregado")
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
            const response = await axios.get(`${apiUrl}/api/hardware/${id}/doc`, {
                responseType: 'blob',
                withCredentials: true
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
        <div className="w-full space-y-8">

            {/* HEADER */}
            <h2 className="text-3xl font-bold text-center tracking-tight">
                Gestión de Órdenes de Hardware
            </h2>

            {/* EMPTY */}
            {hardware.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-6 rounded-xl text-center shadow-sm">
                    No hay órdenes registradas
                </div>
            )}

            {/* ========== SOLICITADAS ========== */}
            {filteredHardware.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold flex items-center gap-3">
                        Órdenes Solicitadas
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                            {filteredHardware.length}
                        </span>
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        {filteredHardware.map(orderHardware => (
                            <div key={orderHardware._id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col justify-between">

                                <div>

                                    <div className="flex justify-between items-start mb-3">
                                        <strong className="text-lg">{orderHardware.areaName}</strong>
                                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                                            Pendiente
                                        </span>
                                    </div>

                                    {/* HARDWARE */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {orderHardware.hardware?.map((item, i) => (
                                            <span key={i}
                                                className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-lg">
                                                {item.nombre} × {item.cantidad}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-gray-600 text-sm mb-2">
                                        {orderHardware.description}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Creada: {new Date(orderHardware.fecha).toLocaleDateString()}
                                    </p>

                                </div>

                                {/* ACTIONS */}
                                <div className="flex justify-end gap-3 mt-4">

                                    <button
                                        onClick={() => openModal("confirm", orderHardware._id)}
                                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg">
                                        <IconChek />
                                    </button>

                                    <button
                                        onClick={() => handleDownloadDoc(orderHardware._id)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg">
                                        <IconDownload />
                                    </button>

                                    <button
                                        onClick={() => openModal("delete", orderHardware._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg">
                                        <IconDelete />
                                    </button>

                                </div>

                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* ========== ENTREGADAS ========== */}
            {filteredConfirmHardware.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold flex items-center gap-3">
                        Órdenes Entregadas
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            {filteredConfirmHardware.length}
                        </span>
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        {filteredConfirmHardware.map(confirmHardware => (
                            <div key={confirmHardware._id}
                                className="bg-gray-50 border rounded-2xl p-5">

                                <div className="flex justify-between mb-3">
                                    <strong>{confirmHardware.areaName}</strong>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                        Entregado
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {confirmHardware.hardware?.map((item, i) => (
                                        <span key={i}
                                            className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-lg">
                                            {item.nombre} × {item.cantidad}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-sm text-gray-600">
                                    {confirmHardware.description}
                                </p>

                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={() => openModal("delete", confirmHardware._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg">
                                        <IconDelete />
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* MENSAJES */}
            {errorMessage && (
                <div className="text-red-600 text-center font-medium">
                    {errorMessage}
                </div>
            )}

            {confirmationMessage && (
                <div className="text-green-600 text-center font-medium">
                    {confirmationMessage}
                </div>
            )}

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl space-y-5">

                        <h2 className="text-lg font-semibold text-center">
                            {currentAction.action === "delete"
                                ? "¿Eliminar orden?"
                                : "Confirmar entrega"}
                        </h2>

                        <div className="flex justify-end gap-4">

                            <button
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>

                            <button
                                className={`px-4 py-2 rounded-lg text-white ${currentAction.action === "delete"
                                        ? "bg-red-600 hover:bg-red-700"
                                        : "bg-green-600 hover:bg-green-700"
                                    }`}
                                onClick={confirmAction}>
                                Confirmar
                            </button>

                        </div>
                    </div>
                </div>
            )}

        </div>
    )

}

export default ListHardware