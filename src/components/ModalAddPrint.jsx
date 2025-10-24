import { useState, useEffect } from "react";
import axios from "axios";


const ModalAddPrint = ({onPrintAdded, onClose }) => {
    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("")
    const [selectedToner, setSelectedToner] = useState("")
    const [toners, setToners] = useState([])
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


    useEffect(() => {
        const fetchToners = async () => {
            try {
                const tonersResponse = await axios.get(`${apiUrl}/api/toners`,
                    { withCredentials: true })

                setToners(tonersResponse.data)
            } catch (error) {
                console.error("Error fetching toners", error)
            }
        }

        fetchToners()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const printData = {
                marca,
                modelo,
                toner: selectedToner
            }
            
            console.log(printData)
            const response = await axios.post(`${apiUrl}/api/addprint`, printData, {
                withCredentials: true
            })

            onPrintAdded(response.data)
            onClose()
            
        } catch (error) {
            console.error("Error adding print: ", error)
        }
    }

    return (
        <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-center text-2xl font-bold mb-6">Agregar Impresora</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="mb-5">
                <label
                        htmlFor="marca"
                        className="block mb-2 text-sm font-medium text-gray-900  mt-5"
                    >
                        Marca
                    </label>
                    <input type="text"
                        id="marca"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Marca"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        required />
                </div>
                <div className="mb-5 ">
                <label
                        htmlFor="modelo"
                        className="block mb-2 text-sm font-medium text-gray-900  mt-5"
                    >
                        Modelo
                    </label>
                    <input type="text"
                        id="modelo"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Modelo"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        required />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="toner"
                        className="block mb-2 text-sm font-medium text-gray-900  mt-5"
                    >
                        Toner
                    </label>
                    <select
                        id="toner"
                        value={selectedToner}
                        onChange={(e) => setSelectedToner(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        required
                    >
                        <option value="" disabled>
                            Seleccione el toner que utiliza
                        </option>
                        {toners.map((toner) => (
                            <option key={toner._id} value={toner._id}>
                                {toner.toner}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    AGREGAR
                </button>
            </form >
        </div >
    )
}

export default ModalAddPrint;