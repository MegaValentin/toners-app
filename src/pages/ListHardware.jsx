import React, { useState, useEffect } from "react"
import axios from "axios"
import IconDownload from "../components/Icons/IconDownload"
import IconDelete from "../components/Icons/IconDelete"
import IconChek from "../components/Icons/IconCheck"
import IconEdit from "../components/Icons/IconEdit"

const ListHardware = () => {
    const [hardware, setHardware] = useState([])
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState(null);

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

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                if (showModal) setShowModal(false);
                if (showEditModal) setShowEditModal(false);
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [showModal, showEditModal]);


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

    const openEditModal = (order) => {
        setEditData({
            _id: order._id,
            description: order.description,
            hardware: order.hardware.map(h => ({ ...h }))
        });
        setShowEditModal(true);
    };

    const handleEditDescription = (e) => {
        setEditData({ ...editData, description: e.target.value });
    };

    const handleEditHardware = (index, field, value) => {
        const updated = [...editData.hardware];
        updated[index][field] = field === "cantidad" ? Number(value) : value;
        setEditData({ ...editData, hardware: updated });
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`${apiUrl}/api/hardware/${editData._id}`,
                {
                    hardware: editData.hardware,
                    description: editData.description,
                    area: hardware.find(h => h._id === editData._id).area
                },
                { withCredentials: true })

            const response = await axios.get(`${apiUrl}/api/hardwares`, {
                withCredentials: true
            })

            setHardware(response.data)
            setShowEditModal(false)
            setConfirmationMessage("Orden actualizada")
            setTimeout(() => setConfirmationMessage(""), 1500)
        } catch (error) {
            console.error(error)
            setErrorMessage("Error al editar")
        }
    }

    return (
        <div className="w-full space-y-8">
            {hardware.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-6 rounded-xl text-center shadow-sm">
                    No hay órdenes registradas
                </div>
            )}

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
                                        onClick={() => openEditModal(orderHardware)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm">
                                        <IconEdit />
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

            {showEditModal && editData && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-6">

                    <div className=" bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6 space-y-4 ">

                        <h2 className="text-lg sm:text-xl font-semibold">
                            Editar Orden
                        </h2>

                        <div>
                            <label className="text-sm font-medium">
                                Descripción
                            </label>

                            <textarea
                                value={editData.description}
                                onChange={handleEditDescription}
                                className="w-full border rounded-lg p-2 mt-1 text-sm sm:text-base resize-none min-h-[90px]"
                            />
                        </div>

                        <div className="space-y-3">
                            {editData.hardware.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col sm:flex-row gap-2"
                                >

                                    <input
                                        value={item.nombre}
                                        onChange={(e) =>
                                            handleEditHardware(i, "nombre", e.target.value)
                                        }
                                        className="flex-1 border rounded-lg p-2 text-sm sm:text-base"
                                        placeholder="Hardware"
                                    />

                                    <input
                                        type="number"
                                        value={item.cantidad}
                                        onChange={(e) =>
                                            handleEditHardware(i, "cantidad", e.target.value)
                                        }
                                        className=" w-full sm:w-28 border rounded-lg p-2 text-sm sm:text-base"
                                        placeholder="Cant."
                                    />

                                </div>
                            ))}
                        </div>

                        <div className="  flex flex-col sm:flex-row justify-end gap-3 pt-3">

                            <button
                                onClick={() => setShowEditModal(false)}
                                className=" px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg w-full sm:w-auto">
                                Cancelar
                            </button>

                            <button
                                onClick={handleSaveEdit}
                                className=" px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg w-full sm:w-auto">
                                Guardar
                            </button>

                        </div>

                    </div>
                </div>
            )}


        </div>
    )

}

export default ListHardware