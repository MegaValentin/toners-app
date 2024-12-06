import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import IconCheckList from "../components/Icons/IconCheckList";
import IconDownload from "../components/Icons/IconDownload";
import IconDelete from "../components/Icons/IconDelete";
import IconAdd from "../components/Icons/IconAdd";

const Hardware = () => {
  const [hardware, setHardware] = useState('');
  const [hardwareList, setHardwareList] = useState([]);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [areas, setAreas] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const areasResponse = await axios.get(`${apiUrl}/api/offices`, {
          withCredentials: true,
        });
        setAreas(areasResponse.data);
      } catch (error) {
        console.error("Error fetching offices: ", error);
      }
    };
    fetchOffices();
  }, []);

  const handleAddHardware = () => {
    if (hardware.trim() === '') return;
    setHardwareList([...hardwareList, hardware.trim()]);
    setHardware('');
  };

  const handleRemoveHardware = (index) => {
    setHardwareList(hardwareList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post(
        `${apiUrl}/api/addhardware`,
        {
          hardware: hardwareList,
          area: selectedArea,
          description,
        },
        {
          withCredentials: true,
          responseType: 'blob'
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Orden_Hardware.pdf'); 
      document.body.appendChild(link);
      link.click(); 
      document.body.removeChild(link);
      
      setMessage('Orden creada exitosamente');

      setTimeout(() => {
        setMessage('');
      }, 1000);


      setHardwareList([]);
      setDescription('');
      setSelectedArea('');
    } catch (error) {
      console.error('Error al agregar la orden: ', error);
      setMessage('Hubo un error al agregar la orden.');
      setTimeout(() => {
        setMessage('');
      }, 1000);
    }
  };

  return (
    <div className="bg-transparent p-8 rounded-lg w-full mt-10">
      <h2 className="text-center text-2xl font-bold mb-6">Hardware</h2>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label
            htmlFor="area"
            className="block mb-2 text-sm font-medium text-gray-900"
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
          <label htmlFor="Hardware" className="block mb-2 text-sm font-medium text-gray-900">
            Hardware Solicitado
          </label>
          <div className="flex gap-2">
            <input
              value={hardware}
              placeholder="Ejemplo: Monitor"
              onChange={(e) => setHardware(e.target.value)}
              type="text"
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
            <button
              type="button"
              onClick={handleAddHardware}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              <IconAdd />
            </button>
          </div>
        </div>

        {hardwareList.length > 0 && (
          <div className="mb-4">
            <ul className="list-disc ml-5">
              {hardwareList.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveHardware(index)}
                    className="text-red-500 hover:text-red-700 text-sm mb-3"
                  >
                    <IconDelete />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="descripcion"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Descripción:
          </label>
          <textarea
            id="descripcion"
            cols="30"
            rows="10"
            value={description}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-3/4 bg-teal-500 hover:bg-teal-800 hover:border hover:border-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center gap-x-2"
          >
            <IconDownload />
            Descargar
          </button>
        </div>
      </form>

      {message && (
        <p
          className={`mt-4 text-center font-semibold ${message.includes('error') ? 'text-red-500' : 'text-green-500'
            }`}
        >
          {message}
        </p>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
        <Link
          to={"/listhardware"}
          className="text-gray-500 hover:text-gray-700 flex items-center space-x-1 p-2"
        >
          <IconCheckList /> Lista de pedidos
        </Link>
      </div>
    </div>
  );
};

export default Hardware;
