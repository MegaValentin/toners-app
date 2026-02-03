import { useState, useEffect } from "react";
import axios from "axios";
import IconPC from "../components/Icons/IconPC";
import Modal from "react-modal";
import ButtonClose from "../components/ButtonCloese";
import ListPc from "../components/ListPC";
const PcPage = () => {
    const [areas, setAreas] = useState([]);
    const [form, setForm] = useState({
        area: "",
        ip: "",
        porqueSeTrajo: "",
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/offices`, {
                    withCredentials: true
                })
                setAreas(res.data)
            } catch (error) {
                console.error("Error al cargar las areas", error)
            }
        }
        fetchAreas()
    }, [])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setMsg("")

        try {
            await axios.post(`${apiUrl}/api/addpc`, form, {
                withCredentials: true
            })
            setMsg("Pc agregada correctamente")
            setForm({ area: "", ip: "", porqueSeTrajo: "" })
        } catch (error) {
            setError(error.response?.data?.message || "Error al crear la pc")
        } finally {
            setLoading(false);
            setTimeout(() => {
                setMsg("");
                setError("");
            }, 2000);
        }
    }

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (
        <div className="bg-transparent p-2 sm:p-6 rounded-lg w-full mt-6 sm:mt-10">
            <h1>Mantenimiento de PC</h1>
            <div >
                <form onSubmit={handleSubmit} >
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            ÁREA
                        </label>
                        <select
                            name="area"
                            value={form.area}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="">Seleccione un área</option>
                            {areas.map(a => (
                                <option key={a._id} value={a._id}>
                                    {a.area}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            IP
                        </label>

                        <input
                            name="ip"
                            value={form.ip}
                            onChange={handleChange}
                            placeholder="192.168.x.x"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            FALLA / MOTIVO
                        </label>

                        <textarea
                            name="porqueSeTrajo"
                            value={form.porqueSeTrajo}
                            onChange={handleChange}
                            rows={8}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <button
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg transition"
                    >
                        Agregar Orden
                    </button>
                </form>
                {msg && (
                    <div className="text-green-600 text-center text-sm font-medium">
                        {msg}
                    </div>
                )}
                {error && (
                    <div className="text-red-600 text-center text-sm font-medium">
                        {error}
                    </div>
                )}
            </div>
            <button
                onClick={openModal}
                className="text-gray-500 hover:text-gray-700 flex items-center space-x-1 p-2"
            >
                <IconPC />
                <span>Listado de PC</span>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Historial de Órdenes"
                className="modal-content p-4 sm:p-9 bg-white rounded-md shadow-lg overflow-auto"
                overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div className="flex justify-end">

                    <ButtonClose onClick={closeModal} />
                </div>
                <div className="mt-4">
                    <ListPc/>
                </div>
            </Modal>
        </div>

    )
};

export default PcPage;