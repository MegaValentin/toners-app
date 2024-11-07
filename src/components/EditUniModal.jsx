import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonClose from './ButtonCloese';

const EditUniModal = ({ uni, isOpen, onClose, onSave }) => {
    const [uniName, setUniName] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [marcaName, setMarcaName] = useState('')
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        if (uni) {
            setMarcaName(uni.marca || '')
            setUniName(uni.unidadImagen || '')
            setCantidad(uni.cantidad || '')
        } else {
            setMarcaName('')
            setUniName('')
            setCantidad('')
        }
    }, [uni])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!uni?._id) {
            console.error('Error: uni is undefined or does not have an _id');
            return;
        }
        try {
            await axios.put(`${apiUrl}/api/uni/${uni._id}`,
                {
                    marca: marcaName,
                    unidadImagen: uniName,
                    cantidad: parseInt(cantidad, 10)
                },
                { withCredentials: true })
            onSave()
            onClose()
        } catch (error) {
            console.error('Error updating uni: ', error)
        }
    }

    if(!isOpen) return null

    return (
        <div className="modal z-50">
            <ButtonClose onClick={onClose} />
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <h2 className="text-center text-2xl font-bold mb-6">EDITAR UNIDAD DE IMAGEN</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="mb-5">
                        <input
                            type="text"
                            id="marcaName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Marca"
                            value={marcaName}
                            onChange={(e) => setMarcaName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type="text"
                            id="uniName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Nombre de la unidad de imagen"
                            value={uniName}
                            onChange={(e) => setUniName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type="number"
                            id="cantidad"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Cantidad"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Guardar
                    </button>
                </form>

            </div>
        </div>
    )
}

export default EditUniModal