import React, { useState } from "react";
import axios from "axios";

const ReportGenerator = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const handleMonthlyReport = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/report/monthly`, {
        params: { month, year },
        responseType: 'blob',
        withCredentials: true,
      });

      const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      const monthName = monthNames[month - 1];
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Reporte_Mensual_${monthName}-${year}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating monthly report:", error);
      setErrorMessage("Error generating monthly report: " + (error.response?.data?.message || error.message));
    }
  };

  const handleYearlyReport = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/report/yearly`, {
        params: { year },
        responseType: 'blob',
        withCredentials: true,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Reporte_Anual_${year}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating yearly report:", error);
      setErrorMessage("Error generating yearly report: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-8 relative overflow-x-auto overflow-y-auto size-4/5 max-h-96 flex justify-center">
        <div className="w-11/12 text-sm text-left rtl:text-right text-gray-400 mb-10">
          <h2>Generar reporte</h2>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">
              {errorMessage}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="month">
              Mes:
            </label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Seleccione un mes</option>
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
              Año:
            </label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <button
              onClick={handleMonthlyReport}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Generar Reporte Mensual
            </button>
          </div>
          <div>
            <button
              onClick={handleYearlyReport}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Generar Reporte Anual
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
