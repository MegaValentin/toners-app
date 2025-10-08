import React, { useEffect, useState } from "react";
import axios from "axios";
import OkMessage from "./OkMessage";



const LowToners = () => {
  
  const [toners, setToners] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchLowToners = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/lowstock`, {
          withCredentials: true, // Ensure credentials (cookies) are sent
        });
        setToners(response.data);
      } catch (error) {
        console.error('Error fetching low toner', error);
      }
    };
  
    fetchLowToners();
  }, []);
  return (
    
    <div className="flex flex-col items-center w-full px-4 py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        🔻 Toners con poco stock
      </h1>

      {toners.length === 0 ? (
        <OkMessage message="No hay tóners con poco stock 🎉" />
      ) : (
        <div className="w-full max-w-3xl space-y-4 overflow-y-auto max-h-[550px] custom-scrollbar">
          {toners.map((toner) => (
            <div
              key={toner._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {toner.marca} - {toner.toner}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Ideal: <span className="font-medium">{toner.cantidadIdeal}</span> | Actual:{" "}
                    <span className="font-medium">{toner.cantidadActual}</span> | Faltan:{" "}
                    <span className="font-medium text-red-500">{toner.faltante}</span>
                  </p>
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  <span
                    className={
                      parseFloat(toner.porcentaje) < 20
                        ? "text-red-600"
                        : parseFloat(toner.porcentaje) < 35
                        ? "text-yellow-500"
                        : "text-green-500"
                    }
                  >
                    {toner.porcentaje}
                  </span>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    parseFloat(toner.porcentaje) < 20
                      ? "bg-red-500"
                      : parseFloat(toner.porcentaje) < 35
                      ? "bg-yellow-400"
                      : "bg-green-500"
                  }`}
                  style={{ width: toner.porcentaje }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
   
  );
};

export default LowToners;
