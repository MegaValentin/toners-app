import React, { useEffect, useState } from "react";
import axios from "axios";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {toners.length === 0 ? (
          <div>
            <p className="text-center text-2xl font-bold mb-6">
              Todo OK
            </p>
          </div>
        ) : (
          toners.map((toner) => (
            <div
              key={toner._id}
              className="max-w-sm p-6 bg-red-500 border border-red-700 rounded-lg shadow "
            >
              <h2 className="mb-2 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
                {toner.toner}
              </h2>

              <p className="text-lg font-medium text-gray-700 dark:text-gray-400">
                Cantidad: {toner.cantidad}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LowToners;
