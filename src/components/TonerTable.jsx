import React, { useEffect, useState } from "react";
import axios from "axios";

const TonersTable = () => {
  const [toners, setToners] = useState([]);

  useEffect(() => {
    // Función para obtener los toners desde la API
    const fetchToners = async () => {
      try {
        const response = await axios.get("http://localhost:3500/api/toners");
        setToners(response.data);
      } catch (error) {
        console.error("Error fetching toners:", error);
      }
    };

    fetchToners();
  }, []);

  return (
    <div className="flex justify-center ">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg size-4/5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:bg-sky-900 dark:text-gray-400">
            <tr className="text-white">
              <th scope="col" className="px-6 py-3">
                Toner
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">cantidad</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {toners.map((toner) => (
              <tr key={toner._id} className="border-b bg-white  text-black">
                <td className="px-6 py-4 font-medium whitespace-nowrap ">
                  {toner.toner}
                </td>
                <td className="px-4 py-2 text-gray-900">{toner.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TonersTable;
