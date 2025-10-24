import { useState, useEffect } from "react";
import Modal from "react-modal";
import ButtonClose from "../components/ButtonCloese";
import ModalAddPrint from "../components/ModalAddPrint";
import ListPrints from "../components/ListPrints";
import axios from "axios";

const PrintPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [print, setPrint] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [selectedPrint, setSelectedPrint] = useState(null);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const fetchPrints = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/prints`, {
                withCredentials: true
            })

            setPrint(response.data)
        } catch (error) {
            console.error("Error fetching prints: ", error)
        }
    }

    useEffect(() => {
        fetchPrints();
    }, []);

    const openModal = () => { setModalIsOpen(true) }
    const closeModal = () => { setModalIsOpen(false) }

    const handlePrintAdded = (newPrint) => {
        setPrint((prevPrint) => [...prevPrint, newPrint])
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/print/${id}`, { withCredentials: true })

            setPrint((prev) => prev.filter((p) => p._id !== id))
        } catch (error) {
            console.error("Error al eliminar la impresora: ", error)
        }
    }

    const openModalDelete = (id) => {
        setCurrentAction({ id })
        setShowModal(true)
    }

    const confirmAction = () => {
        handleDelete(currentAction.id)
        setShowModal(false);
    }

    const handleEdit = (print) => {
        openModal(print);
    };

    return (
        <div className="bg-transparent p-8 rounded-lg w-full  mt-10">
            <button
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">

                AGREGAR IMPRESORA
            </button>

            <ListPrints prints={print} onEdit={handleEdit} onDelete={openModalDelete} />

            <Modal
                isOpen={modalIsOpen}
                onAfterClose={closeModal}
                contentLabel={selectedPrint ? "Editar Impresora" : "Agregar Impresora"}
                className="modal"
                overlayClassName="overlay"
            >
                <ButtonClose onClick={closeModal} />
                <ModalAddPrint onPrintAdded={handlePrintAdded} onClose={closeModal} />
            </Modal>

            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl max-w-sm w-full space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            ¿Estás seguro de eliminar esta impresora?
                        </h2>

                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                onClick={confirmAction}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default PrintPage;