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
          withCredentials: true, 
        });
        setToners(response.data);
      } catch (error) {
        console.error('Error fetching low toner', error);
      }
    };
  
    fetchLowToners();
  }, []);

  const getStatus = (p) => {
    const val = parseFloat(p);
    if (val < 20) return { text: "Crítico", color: "bg-red-500" };
    if (val < 35) return { text: "Bajo", color: "bg-yellow-400" };
    return { text: "Aceptable", color: "bg-green-500" };
  };
  return (
    <div className="flex flex-col items-center w-full px-4 py-6">

      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          🔻 Toners con poco stock
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {toners.length} en alerta
        </p>
      </div>

      {toners.length === 0 ? (
        <div className="mt-10">
          <OkMessage message="No hay tóners con poco stock 🎉" />
        </div>
      ) : (
        <div className="w-full max-w-3xl space-y-5 overflow-y-auto max-h-[600px] pr-2">
          {toners.map((toner) => {
            const status = getStatus(toner.porcentaje);

            return (
              <div
                key={toner._id}
                className="group bg-gradient-to-br from-white to-gray-50 
                dark:from-gray-800 dark:to-gray-900
                shadow-md hover:shadow-xl 
                rounded-2xl p-5 border border-gray-200 dark:border-gray-700
                transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {toner.marca} — {toner.toner}
                    </h2>

                    <div className="flex gap-3 mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <span>Ideal: <b>{toner.cantidadIdeal}</b></span>
                      <span>Actual: <b>{toner.cantidadActual}</b></span>
                      <span className="text-red-500">
                        Faltan: <b>{toner.faltante}</b>
                      </span>
                    </div>
                  </div>

                  <span className={`text-xs text-white px-3 py-1 rounded-full ${status.color}`}>
                    {status.text}
                  </span>
                </div>

                <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-4 rounded-full ${status.color} transition-all duration-700`}
                    style={{ width: toner.porcentaje }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white drop-shadow">
                    {toner.porcentaje}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LowToners;
