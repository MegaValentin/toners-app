import React, { useState, useEffect } from "react";
import axios from 'axios';

const ToDoList = () => {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [message, setMessage] = useState('');
    const [selectedArea, setSelectedArea] = useState("");
    const [areas, setAreas] = useState([]);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        const fetchOffices = async () => {
          try {
            const areasResponse = await axios.get(
              `${apiUrl}/api/offices`,  {
                withCredentials: true, 
              }
            );
            setAreas(areasResponse.data);
          } catch (error) {
            console.error("Error fetching toners and areas:", error);
          }
        };
    
        fetchOffices();
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        try {
            const response = await axios.post(
                `${apiUrl}/api/addtask`, {
                titulo,
                area: selectedArea,
                descripcion,
                
            }, {
                withCredentials: true,
            });
            setMessage('Tarea agregada exitosamente');
            setTimeout(() => {
                setMessage("")
            }, 1000)
            setTitulo('');
            setDescripcion('');
            setSelectedArea("");
        } catch (error) {
            console.error('Error al agregar tarea:', error);
            setMessage('Hubo un error al agregar la tarea.');
            setTimeout(() => {
                setMessage("")
            }, 1000)
            setTitulo('');
            setDescripcion('');
        }
    }

    return (
        <div className="bg-transparent p-8 rounded-lg w-full mt-10 ">
            
            <h2 className="text-center text-2xl font-bold mb-6">Agregar tarea</h2>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">

            <div className="mb-4">
                    <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900">Categoría de la Tarea:</label>
                    <select
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    >
                      {`["Red", "Impresora", "hardware", "Configuracion e Instalacion","Mail", "Relojes", "Traslado"],`}
                        <option value="" disabled>Seleccione una categoría</option>
                        <option value="Red">Red</option>
                        <option value="Impresora">Impresora</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Configuracion e Instalacion">Configuracion e Instalacion</option>
                        <option value="Mail">Mail</option>
                        <option value="Relojes">Relojes</option>
                        <option value="Traslado">Traslados</option>
                        <option value="RAFAM">RAFAM</option>
                    </select>
                </div>
                <div className="mb-4">
                <label
              htmlFor="area"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Área
            </label>
            <select
              id="area"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value="" disabled>
                Seleccione un área
              </option>
              {areas.map((area) => (
                <option key={area._id} value={area._id}>
                  {area.area}
                </option>
              ))}
            </select>

                </div>

                <div className="mb-4">
                    <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 ">Descripcion:</label>
                    <textarea id="descripcion"
                        cols="30"
                        rows="10"
                        value={descripcion}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                <div className="flex justify-center">
                <button type='submite'
                    className="w-3/4 bg-teal-500 hover:bg-teal-800 hover:border hover:border-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Agregar Tarea</button>

                </div>
            </form>
            {message && (
                <p className={`mt-4 text-center font-semibold ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
                    {message}
                </p>
            )}
        </div>
    )
}

export default ToDoList;
