import React, { useEffect, useState } from "react";
import axios from "axios";

const PedidoRecomendado = () => {
  const [toners, setToners] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const fetchToners = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/recommended`, {
        withCredentials: true,
      });
      setToners(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage("No se pudo cargar el pedido recomendado");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToners();
  }, []);

  const brandOrder = ["HP", "RICOH", "SAMSUNG", "BROTHER", "PANTUM", "KYOSERA"];

  const sortedToners = [...toners].sort((a, b) => {
    const A = a.marca.trim().toUpperCase();
    const B = b.marca.trim().toUpperCase();
    const indexA = brandOrder.indexOf(A);
    const indexB = brandOrder.indexOf(B);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

const  remindingColor = (value) => {
    if (value <= 0) return "bg-green-100 text-green-700";
    if (value <= 2) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const tonersRecomendedDocWord = async () => {
    try {
      const word = await axios.get(`${apiUrl}/api/recommendes/word`, {
        responseType: "blob",
        withCredentials: true,
      });

      const url = window.URL.createObjectURL(new Blob([word.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Pedido_Toner.docx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setErrorMessage("Error generando Word");
    }
  };

  const tonersRecomendedDoc = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/recommendes/doc`, {
        responseType: "blob",
        withCredentials: true,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Pedido_Toner.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setErrorMessage("Error generando PDF");
    }
  };

  return (
    <div className="p-3 sm:p-6">
      
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200">

        <div className="p-4 sm:p-6 border-b flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
          
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Pedido Recomendado de Toners
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Basado en stock ideal vs stock actual
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
            <button
              onClick={tonersRecomendedDoc}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition text-sm"
            >
              Descargar PDF
            </button>
  
            <button
              onClick={tonersRecomendedDocWord}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition text-sm"
            >
              Descargar Word
            </button>
          </div>
  
        </div>

        {errorMessage && (
          <div className="m-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        <div className="hidden md:block overflow-auto max-h-[65vh]">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left">Marca</th>
                <th className="px-4 py-3 text-left">Toner</th>
                <th className="px-4 py-3 text-center">Ideal</th>
                <th className="px-4 py-3 text-center">Actual</th>
                <th className="px-4 py-3 text-center">Pedido</th>
              </tr>
            </thead>
  
            <tbody>
              {sortedToners.map((toner) => (
                <tr key={toner._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {toner.marca}
                  </td>
  
                  <td className="px-4 py-3 text-gray-700">
                    {toner.toner}
                  </td>
  
                  <td className="px-4 py-3 text-center">
                    {toner.cantidadIdeal}
                  </td>
  
                  <td className="px-4 py-3 text-center">
                    {toner.cantidadActual}
                  </td>
  
                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${remindingColor(toner.pedidoRecomendado)}`}>
                      {toner.pedidoRecomendado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden p-3 space-y-3 max-h-[65vh] overflow-auto">
          {sortedToners.map((toner) => (
            <div key={toner._id} className="border rounded-xl p-3 shadow-sm">
  
              <div className="flex justify-between mb-2">
                <span className="font-bold text-gray-800">
                  {toner.marca}
                </span>
  
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${remindingColor(toner.pedidoRecomendado)}`}>
                  Pedir: {toner.pedidoRecomendado}
                </span>
              </div>
  
              <div className="text-sm text-gray-700">
                {toner.toner}
              </div>
  
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600">
                <div>Ideal: {toner.cantidadIdeal}</div>
                <div>Actual: {toner.cantidadActual}</div>
              </div>
  
            </div>
          ))}
        </div>
  
      </div>
    </div>
  );
  
};

export default PedidoRecomendado;
