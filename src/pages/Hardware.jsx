import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import IconCheckList from "../components/Icons/IconCheckList";
import IconDownload from "../components/Icons/IconDownload";

const Hardware = () => {
  const [hardware, setHardware] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [areas, setAreas] = useState([])
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const areasResponse = await axios.get(
          `${apiUrl}/api/offices`, {
          withCredentials: true
        }
        );
        setAreas(areasResponse.data)
      } catch (error) {
        console.error("Error fetching offices: ", error)
      }
    }
    fetchOffices()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const response = await axios.post(
        `${apiUrl}/api/addhardware`, {
        hardware,
        area: selectedArea,
        description
      }, {
        withCredentials: true
      }
      )
      setMessage('Orden creada exitodamente')
      setTimeout(() => {
        setMessage("")
      }, 1000)
      setHardware("")
      setDescription("")
      setSelectedArea("")
      console.log({
        hardware,
        area: selectedArea,
        description
      });
    } catch (error) {
      console.error('Error al agregar la orden: ', error)
      setMessage('Hubo un error al agregar la orden.')
      setTimeout(() => {
        setMessage("")
      }, 1000)
      setHardware("")
      setDescription("")
    }
  }
  return (

    <div className="bg-transparent p-8 rounded-lg w-full mt-10 ">
      <h2 className="text-center text-2xl font-bold mb-6">Hardware</h2>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="Hardware" className="block mb-2 text-sm font-medium text-gray-900">
            Hardware Solicitado
          </label>
          <input
            value={hardware}
            required
            onChange={(e) => setHardware(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
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
            value={description}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) => setDescription(e.target.value)}
          />

        </div>
        <div className="flex justify-center">
  <button
    type="submit"
    className="w-3/4 bg-teal-500 hover:bg-teal-800 hover:border hover:border-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center gap-x-2">
    <IconDownload />
    Descargar
  </button>
</div>
      </form>
      {message && (
        <p className={`mt-4 text-center font-semibold ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
      <div className="pl-4 w-3/4 ">

        <Link to={"/listhardware"}
          className=" w-1/6 flex justify-center text-black text-sm px-5 py-2.5 lg:text-base gap-x-2 hover:bg-gray-300 rounded-lg ">
          <IconCheckList /> Lista de pedidos
        </Link>
      </div>

    </div>
  )
}



export default Hardware;