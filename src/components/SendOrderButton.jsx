import React, { useState } from "react";
import axios from 'axios';


const SendOrderButton = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/sendorder`, {
        responseType: 'blob',
        withCredentials: true,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Reporte_Stock.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating stock report:", error);
      setErrorMessage("Error generating stock report: " + (error.response?.data?.message || error.message));
    }
  };
  
    
      return (
        <div className="p-4">
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}
        <div className="mb-4">
          <button
            onClick={handleGenerateReport}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generar Pedido Recomendado
          </button>
        </div>
      </div>
      );

}

export default SendOrderButton;