import React, { useEffect, useState } from "react";
import axios from "axios";

const PedidoRecomendado = () => {
  const [toners, setToners] = useState([]);

  const fetchToners = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3500/api/pedidorecomendado"
      );
      setToners(response.data);
    } catch (error) {
      console.error("Error fetching toners:", error);
    }
  };

  useEffect(() => {
    fetchToners();
  }, []);

  return (
    <div className="flex justify-center ">
      <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg size-4/5 max-h-96">
        <table className="w-full text-sm text-left rtl:text-right  text-gray-400">
          <thead className="text-xs  uppercase bg-sky-900 ">
            <tr className="text-white">
              <th scope="col" className="px-6 py-3">
                Toner
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Stock Ideal</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Stock Actual</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Pedido Recomendado</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {toners.map((toner) => (
              <tr key={toner._id} className="border-b bg-white  text-black">
                <td className="px-6 py-4 font-medium whitespace-nowrap ">
                  {toner.toner}
                </td>
                <td className="px-4 py-2 text-gray-900">{toner.ideal}</td>
                <td className="px-4 py-2 text-gray-900">{toner.current}</td>
                <td className="px-4 py-2 text-gray-900">{toner.needed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PedidoRecomendado;
