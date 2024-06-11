import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonClose from './ButtonCloese';

const EditTonerModal = ({ toner, isOpen, onClose, onSave }) => {
    const [tonerName, setTonerName] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [marcaName, setMarcaName] = useState('')

    useEffect(() => {
        if (toner) {
            setMarcaName(toner.marca || '')
            setTonerName(toner.toner || '')
            setCantidad(toner.cantidad || '')
        } else {
            setMarcaName('')
            setTonerName('')
            setCantidad('')
        }
    }, [toner]);

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            await axios.put(`http://localhost:3500/api/toner/${toner._id}`, {
                marca: marcaName,
                toner: tonerName,
                cantidad: parseInt(cantidad, 10),
            });
            onSave();
            onClose();
        } catch (error) {
            console.error('Error updating toner:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <ButtonClose onClick={onClose} />
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <h2 className="text-center text-2xl font-bold mb-6">EDITAR TONER</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="mb-5">
                        <input
                            type="text"
                            id="marcaName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Nombre del toner"
                            value={marcaName}
                            onChange={(e) => setMarcaName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type="text"
                            id="tonerName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Nombre del toner"
                            value={tonerName}
                            onChange={(e) => setTonerName(e.target.value)}
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

export default EditTonerModal;