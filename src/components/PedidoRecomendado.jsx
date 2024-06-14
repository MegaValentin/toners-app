import React, { useEffect, useState } from "react";
import axios from "axios";


const PedidoRecomendado = () => {
  const [toners, setToners] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const fetchToners = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/pedidorecomendado`
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
    <div className="flex justify-center">
      <div className="w-full">
        <div className="table-container overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400 table-fixed-header">
            <thead className="text-xs uppercase bg-sky-900">
              <tr className="text-white">
                <th scope="col" className="px-6 py-3">Marca</th>
                <th scope="col" className="px-6 py-3">Toner</th>
                <th scope="col" className="px-6 py-3">Stock Ideal</th>
                <th scope="col" className="px-6 py-3">Stock Actual</th>
                 <th scope="col" className="px-6 py-3">Pedido Recomendado</th>
              </tr>
            </thead>
            <tbody className="text-xs uppercase bg-white">
              {toners.map((toner) => (
                <tr key={toner._id} className="border-b">
                  <td className="px-6 py-4 font-medium whitespace-nowrap ">{toner.marca}</td>
                  <td className="px-4 py-2 text-gray-900">{toner.toner}</td>
                  <td className="px-4 py-2 text-gray-900">{toner.ideal}</td>
                  <td className="px-4 py-2 text-gray-900">{toner.current}</td>
                  <td className="px-4 py-2 text-gray-900">{toner.needed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  );
};

export default PedidoRecomendado;
