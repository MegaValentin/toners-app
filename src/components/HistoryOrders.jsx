import React, { useState, useEffect } from 'react';
import axios from 'axios';


const HistoryOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const fetchOrders = async () => {

    try {
      const response = await axios.get(`${apiUrl}/api/orders`, {
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching toners:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/cancel/${id}`, null, {
        withCredentials: true,
      });
      console.log("Order canceled:", response.data);
      fetchOrders();
    } catch (error) {
      console.error("Error canceling order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/orders/report`, {
        responseType: 'blob',
        withCredentials: true,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Reporte_Ordenes.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  const handleDateChange = (e) => {
    console.log(e.target.value);
    setFilterDate(e.target.value);
  };

  const filteredOrders = filterDate
  ? orders.filter((order) => new Date(order.fecha).toISOString().split('T')[0] === filterDate)
  : orders;

  return (
    <div className="flex justify-center p-4">
    <div className="w-full  ">

      <div className="my-4 flex justify-center">
        <input
          type="date"
          id="filterDate"
          value={filterDate}
          onChange={handleDateChange}
          className="w-full sm:w-auto p-2 border rounded-md"
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center text-gray-600 font-semibold my-4">
          No hay órdenes agregadas para esta fecha.
        </div>
      ) : (
        <div className="table-container overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-xs lg:text-sm text-left rtl:text-right text-gray-400 table-auto">
            <thead className="text-xs uppercase bg-sky-900">
              <tr className="text-white">
                <th scope="col" className="px-2 sm:px-4 py-3">Area</th>
                <th scope="col" className="px-2 sm:px-4 py-3">Toner</th>
                <th scope="col" className="px-2 sm:px-4 py-3">Cantidad</th>
                <th scope="col" className="px-2 sm:px-4 py-3">Fecha</th>
                <th scope="col" className="px-2 sm:px-4 py-3">Estado</th>
                <th scope="col" className="px-2 sm:px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-b bg-white text-black">
                  <td className="px-2 sm:px-4 py-2 text-gray-900">{order.areaName}</td>
                  <td className="px-2 sm:px-4 py-2">{order.tonerName}</td>
                  <td className="px-2 sm:px-4 py-2 text-gray-900">{order.cantidad}</td>
                  <td className="px-2 sm:px-4 py-2 text-gray-900">{order.fecha}</td>
                  <td className="px-2 sm:px-4 py-2 text-gray-900">
                    {order.isDelivered ? "Entregado" : "No Entregado"}
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-gray-900">
                    {order.isDelivered && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="bg-transparent text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="icon icon-tabler icons-tabler-filled icon-tabler-circle-x text-red-500 hover:text-red-700">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleDownloadReport}
          className="w-full sm:w-1/2 bg-teal-500 hover:bg-teal-800 hover:border hover:border-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Descargar Reporte
        </button>
      </div>
    </div>
  </div>
  )

}

export default HistoryOrders;