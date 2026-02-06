import React, { useState, useEffect } from 'react';
import axios from 'axios';


const RestockForm = () => {
  const [toners, setToners] = useState([]);
  const [restockData, setRestockData] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("")
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchToners = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/toners`, {
          withCredentials: true,
        });
        setToners(response.data);
        setRestockData(response.data.reduce((acc, toner) => {
          acc[toner._id] = ""; // Inicializa la cantidad de restock a 0 para cada tóner
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching toners:', error);
      }
    };

    fetchToners();
  }, []);

  const handleInputChange = (tonerId, cantidad) => {

    const cantidadValue = cantidad === "" ? 0 : Number(cantidad);

    setRestockData({
      ...restockData,
      [tonerId]: cantidadValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restocks = Object.keys(restockData).map((tonerId) => ({
      tonerId,
      cantidad: restockData[tonerId],
    }));

    try {
      const response = await axios.post(`${apiUrl}/api/restockall`, { restocks }, {
        withCredentials: true,
      });
      console.log(response);

      setConfirmationMessage("Restock guardado exitosamente")
      setTimeout(() => setConfirmationMessage(""), 3000)

    } catch (error) {
      console.error('Error completing restock:', error);
      alert('Error completing restock');
    }
  };

  return (
    <div className="p-4 sm:p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-xl rounded-2xl border border-gray-200 flex flex-col"
      >

        {/* HEADER */}
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Carga de Restock
          </h2>
          <p className="text-sm text-gray-500">
            Ingresá las cantidades recibidas por toner
          </p>
        </div>

        {/* LISTA */}
        <div className="flex-1 overflow-y-auto max-h-[60vh] divide-y">

          {toners.map((toner) => (
            <div
              key={toner._id}
              className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-50 transition"
            >

              {/* info toner */}
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">
                  {toner.toner}
                </span>

                <span className="text-xs text-gray-500">
                  Marca: {toner.marca}
                </span>
              </div>

              {/* input */}
              <div className="flex items-center gap-3">

                <span className="text-xs text-gray-500 hidden sm:block">
                  Cantidad
                </span>

                <input
                  type="number"
                  min="0"
                  value={restockData[toner._id]}
                  onChange={(e) =>
                    handleInputChange(toner._id, e.target.value)
                  }
                  className="
                    w-28 px-3 py-2
                    border rounded-lg
                    text-sm text-gray-800
                    focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                    outline-none
                    transition
                  "
                  placeholder="0"
                />
              </div>

            </div>
          ))}

        </div>

        {/* FOOTER */}
        <div className="p-5 border-t bg-gray-50 rounded-b-2xl">

          <button
            type="submit"
            className="
              w-full
              bg-teal-600 hover:bg-teal-700
              text-white font-semibold
              py-3 rounded-xl
              shadow-md
              transition
              active:scale-[0.98]
            "
          >
            Guardar Restock
          </button>

          {confirmationMessage && (
            <div className="mt-3 text-center text-green-600 font-semibold text-sm">
              {confirmationMessage}
            </div>
          )}

        </div>
      </form>
    </div>
  );
};

export default RestockForm;
