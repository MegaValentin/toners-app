import React, { useState, useEffect } from "react";
import axios from "axios";


const OrderForm = () => {
  const [cantidad, setCantidad] = useState(1);
  const [selectedToner, setSelectedToner] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [toners, setToners] = useState([]);
  const [areas, setAreas] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("")
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  
  useEffect(() => {
    const fetchTonersAndAreas = async () => {
      try {
        const tonersResponse = await axios.get(
          `${apiUrl}/api/toners` ,{
            withCredentials: true, 
          }
        );
        const areasResponse = await axios.get(
          `${apiUrl}/api/offices`,  {
            withCredentials: true, 
          }
        );

        const sortedAreas = areasResponse.data
        .map(area => ({
          ...area,
          area: area.area.charAt(0).toUpperCase() + area.area.slice(1).toLowerCase()
        }))
        .sort((a, b) => a.area.localeCompare(b.area));

        setToners(tonersResponse.data);
        setAreas(sortedAreas);
      } catch (error) {
        console.error("Error fetching toners and areas:", error);
      }
    };

    fetchTonersAndAreas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        toner: selectedToner,
        cantidad,
        area: selectedArea,
      };

      console.log(orderData);

      await axios.post(`${apiUrl}/api/addorders`, orderData , {
        withCredentials: true, 
      });
      setCantidad(1);
      setSelectedToner("");
      setSelectedArea("");

      setConfirmationMessage("Orden agregada exitosamente")
      setTimeout(() => {
        setConfirmationMessage("")
      window.location.reload()}, 750)
      

    } catch (error) {
      console.error("Error adding order:", error);
      alert(
        "Error adding order: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="flex justify-center">
      
        <form
          onSubmit={handleSubmit}
          className="max-w-sm mx-auto">
        
          <div className="mb-5 uppercase">
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
          <div className="mb-5 uppercase">
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
                Seleccione un toner
              </option>
              {toners.map((toner) => (
                <option key={toner._id} value={toner._id}>
                  {toner.toner}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="cantidad"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5"
            >
              Cantidad
            </label>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Cantidad"
              min="1"
              required
            />
          </div>
          
          </div>
          <div className="flex justify-center">
          <button
            type="submit"
            className="w-3/4 bg-teal-500 hover:bg-teal-800 hover:border hover:border-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Agregar Orden
          </button>

          </div>

          {confirmationMessage && (
            <div className="mt-4 text-center text-green-500 font-semibold">
              {confirmationMessage}
            </div>
          )}
        </form>
      </div>
    
  );
};

export default OrderForm;
