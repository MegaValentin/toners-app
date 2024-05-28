import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTonerModal = ({ toner, isOpen, onClose, onSave }) => {
    const [tonerName, setTonerName] = useState('');
    const [cantidad, setCantidad] = useState('');

    useEffect(() => {
        if (toner) {
            setTonerName(toner.toner || '');
            setCantidad(toner.cantidad || '');
        } else {
            setTonerName('');
            setCantidad('');
        }
    }, [toner]);

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            await axios.put(`http://localhost:3500/api/toner/${toner._id}`, {
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
            <button
                onClick={onClose}
                className="mt-4 text-gray-600 hover:text-red-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-square-x"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
                    <path d="M9 9l6 6m0 -6l-6 6" />
                </svg>
            </button>
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <h2 className="text-center text-2xl font-bold mb-6">EDITAR TONER</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
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