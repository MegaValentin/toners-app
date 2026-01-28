import React, { useEffect, useState } from "react";
import axios from "axios";


const PedidoRecomendado = () => {
  const [toners, setToners] = useState([]);
  const [ errorMessage, setErrorMessage ] = useState("")
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const fetchToners = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/recommended`, {
        withCredentials: true,
      }
      );
      setToners(response.data);
    } catch (error) {
      console.error("Error fetching toners:", error);
    }
  };

  useEffect(() => {
    fetchToners();
  }, []);

  const brandOrder = ["HP", "Ricoh", "SAMSUNG", "BROTHER", "Pantum", "Kyosera"];

  const sortedToners = [...toners].sort((a, b) => {
    const cleanMarcaA = a.marca.trim().toUpperCase();
    const cleanMarcaB = b.marca.trim().toUpperCase();

    const indexA = brandOrder.indexOf(cleanMarcaA);
    const indexB = brandOrder.indexOf(cleanMarcaB);

    return (indexA === -1 ? brandOrder.length : indexA) - (indexB === -1 ? brandOrder.length : indexB);
  });

  const tonersRecomendedDocWord = async () => {
    try {
      const word = await axios.get(`${apiUrl}/api/recommendes/word`, {
        responseType: 'blob',
        withCredentials: true
      })

      const url = window.URL.createObjectURL(
        new Blob([word.data], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        })
      );
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'Pedido_Toner.docx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error("Error generating current stock report:", error);
      setErrorMessage("Error generating current stock report: " + (error.response?.data?.message || error.message));
    }
  }
  const tonersRecomendedDoc = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/recommendes/doc`, {
        responseType: 'blob',
        withCredentials: true,
      })

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Pedido_Toner.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove()
    } catch (error) {
      console.error("Error generating current stock report:", error);
      setErrorMessage("Error generating current stock report: " + (error.response?.data?.message || error.message));
    }
  }

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
              {sortedToners.map((toner) => (
                <tr key={toner._id} className="border-b">
                  <td className="px-6 py-4 font-medium whitespace-nowrap ">{toner.marca}</td>
                  <td className="px-4 py-2 text-gray-900">{toner.toner}</td>
                  <td className="px-4 py-2 text-gray-900">{toner.cantidadIdeal}</td>
                  <td className="px-4 py-2 text-gray-900">{toner.cantidadActual}</td>
                  <td className="px-4 py-2 text-gray-900">{toner.pedidoRecomendado}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      <div className="p-4">
          
          <div className="mb-3 mt-3">
            <button
              onClick={tonersRecomendedDoc}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Generar Pedido Recomendado
            </button>
          </div>
          <div className="mb-3 mt-3">
            <button
              onClick={tonersRecomendedDocWord}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Descargar Word 
            </button>
          </div>
        </div>
        
          
          
        
      </div>
    </div>

  );
};

export default PedidoRecomendado;
