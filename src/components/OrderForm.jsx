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
          `${apiUrl}/api/toners`, {
          withCredentials: true,
        }
        );
        const areasResponse = await axios.get(
          `${apiUrl}/api/offices`, {
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

      await axios.post(`${apiUrl}/api/addorders`, orderData, {
        withCredentials: true,
      });
      setCantidad(1);
      setSelectedToner("");
      setSelectedArea("");

      setConfirmationMessage("Orden agregada exitosamente")
      setTimeout(() => {
        setConfirmationMessage("")
        window.location.reload()
      }, 750)


    } catch (error) {
      console.error("Error adding order:", error);
      alert(
        "Error adding order: " +
        (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <div
        className="w-full max-w-md bg-white dark:bg-gray-800
        rounded-2xl shadow-xl border dark:border-gray-700 p-6"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            🧾 Nueva Orden
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Complete los datos del pedido
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Área
            </label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              required
              className="w-full p-3 rounded-lg border
              bg-gray-50 dark:bg-gray-900
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-sky-500 focus:outline-none"
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

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Toner
            </label>
            <select
              value={selectedToner}
              onChange={(e) => setSelectedToner(e.target.value)}
              required
              className="w-full p-3 rounded-lg border
              bg-gray-50 dark:bg-gray-900
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-sky-500 focus:outline-none"
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

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Cantidad
            </label>
            <input
              type="number"
              value={cantidad}
              min="1"
              onChange={(e) => setCantidad(Number(e.target.value))}
              required
              className="w-full p-3 rounded-lg border
              bg-gray-50 dark:bg-gray-900
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-800
            text-white font-semibold py-3 rounded-xl
            shadow-md hover:shadow-lg
            transition-all duration-200"
          >
            ➕ Agregar orden
          </button>

          {/* CONFIRM */}
          {confirmationMessage && (
            <div className="text-center p-3 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
              {confirmationMessage}
            </div>
          )}

        </form>
      </div>
    </div>

  );
};

export default OrderForm;
