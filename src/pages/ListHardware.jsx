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
    const [viewOrder, setViewOrder] = useState(null);

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

    const orderedHardware = [...hardware].sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );

    return (
        <div className="w-full space-y-6">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">

                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-3 text-left">Fecha</th>
                                <th className="p-3 text-left">Área</th>
                                <th className="p-3 text-left">Pedido</th>
                                <th className="p-3 text-left">Estado</th>
                                <th className="p-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderedHardware.map(order => {
                                const preview = order.hardware.slice(0, 2)
                                const rest = order.hardware.length - 2
                                return (
                                    <tr key={order._id} className="border-t hover:bg-gray-50">
                                        <td className="p-3 whitespace-nowrap">
                                            {new Date(order.fecha).toLocaleDateString()}
                                        </td>
                                        <td className="p-3 font-medium">
                                            {order.areaName}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex flex-wrap gap-1">
                                                {preview.map((h, i) => (
                                                    <span key={i} className="bg-gray-200 px-2 py-1 rounded text-xs">
                                                        {h.nombre} × {h.cantidad}
                                                    </span>
                                                ))}
                                                {rest > 0 && (
                                                    <span className="text-xs text-gray-500">
                                                        +{rest} más
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium
                                            ${order.confirm
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-orange-100 text-orange-700"}`}>
                                                {order.confirm ? "Entregado" : "Pendiente"}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => setViewOrder(order)}
                                                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs">
                                                    Ver
                                                </button>
                                                {!order.confirm && (
                                                    <button
                                                        onClick={() => openModal("confirm", order._id)}
                                                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded">
                                                        <IconChek />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDownloadDoc(order._id)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
                                                    <IconDownload />
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(order)}
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                                                    <IconEdit />
                                                </button>
                                                <button
                                                    onClick={() => openModal("delete", order._id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
                                                    <IconDelete />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
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
            {viewOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4">
                        <h2 className="text-xl font-semibold">
                            Detalle de Orden
                        </h2>
                        <p><b>Área:</b> {viewOrder.areaName}</p>
                        <p><b>Fecha:</b> {new Date(viewOrder.fecha).toLocaleString()}</p>
                        <p><b>Descripción:</b> {viewOrder.description}</p>
                        <div className="space-y-2">
                            {viewOrder.hardware.map((h, i) => (
                                <div key={i} className="flex justify-between border rounded-lg p-2">
                                    <span>{h.nombre}</span>
                                    <span className="font-medium">{h.cantidad}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setViewOrder(null)}
                                className="bg-gray-700 text-white px-4 py-2 rounded-lg">
                                Cerrar
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