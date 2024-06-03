import React, { useEffect, useState } from "react";
import axios from "axios";
import OkMessage from "./OkMessage";

const LowToners = () => {
  const [toners, setToners] = useState([]);

  useEffect(() => {
    const fetchLowToners = async () => {
      try {
        const response = await axios.get("http://localhost:3500/api/low-toner");
        setToners(response.data);
      } catch (error) {
        console.error("Error fetchin low toner", error);
      }
    };

    fetchLowToners();
  }, []);

  return (
    <div className="bg-transparent p-8 rounded-lg w-full mt-10">
      {toners.length === 0 ? (
        <OkMessage />
      ) : (
        toners.map((toner) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div
              key={toner._id}
              className="max-w-sm p-6 bg-red-500 border border-red-700 rounded-lg shadow "
            >
              <h2 className="mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
                {toner.toner}
              </h2>

              <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700 dark:text-gray-400">
                Cantidad: {toner.cantidad}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LowToners;
