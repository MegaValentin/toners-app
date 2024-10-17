import React, { useState } from 'react';
import axios from 'axios';

const AddTaskForm = () => {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                `${apiUrl}/api/addtask`, {
                titulo,
                descripcion,
            
              }, {
                withCredentials: true, 
              });

            alert('Tarea agregada exitosamente');
            setTitulo('');
            setDescripcion('');
        } catch (error) {
            console.error('Error al agregar tarea:', error);
            alert('Hubo un error al agregar la tarea.');
        }
    }

    return(
    <>
        <h2 className="text-center text-2xl font-bold mb-6">Agregar tarea</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="block text-gray-700 font-bold mb-2">
                <label htmlFor="titulo" className="block text-gray-700 font-bold mb-2">Tarea:</label>
                <input type="text"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            </div>
            <div className="mb-4">
                <label htmlFor="descripcion" className="block text-gray-700 font-bold mb-2">Descripcion:</label>
                <textarea id="descripcion"
                 cols="30"
                rows="10"
                value={descripcion}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setDescripcion(e.target.value)}
                />
            </div>
            <button type='submite'
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Agregar Tarea</button>
        </form>
    
    </>
    )
}

export default AddTaskForm