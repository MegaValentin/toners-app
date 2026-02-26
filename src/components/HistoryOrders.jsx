import React, { useState, useEffect } from 'react';
import axios from 'axios';


const HistoryOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [filterToner, setFilterToner] = useState("");
  const [ filterOffice, setFilterOffice ] = useState("")
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

  const handleTonerChange = (e) => {
    setFilterToner(e.target.value);
  };

  const handleOfficeChange = (e) => {
    setFilterOffice(e.target.value)
  }

  const filteredOrders = orders.filter((order) => {
    const matchesDate = filterDate ? new Date(order.fecha).toISOString().split('T')[0] === filterDate : true;
    const matchesToner = filterToner ? order.tonerName === filterToner : true;
    const matchesOffice = filterOffice ? order.areaName === filterOffice : true
    return matchesDate && matchesToner && matchesOffice;
  });
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          📜 Historial de órdenes
        </h1>
        <p className="text-sm text-gray-500">
          {filteredOrders.length} registros encontrados
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 mb-6 border dark:border-gray-700">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 dark:bg-gray-900 dark:border-gray-600"
          />

          <select
            value={filterToner}
            onChange={(e) => setFilterToner(e.target.value)}
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 dark:bg-gray-900 dark:border-gray-600"
          >
            <option value="">Todos los tóners</option>
            {Array.from(new Set(orders.map(o => o.tonerName))).map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <select
            value={filterOffice}
            onChange={(e) => setFilterOffice(e.target.value)}
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 dark:bg-gray-900 dark:border-gray-600"
          >
            <option value="">Todas las áreas</option>
            {Array.from(new Set(orders.map(o => o.areaName))).map(a => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border dark:border-gray-700 overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto">

          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-sky-900 text-white text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Área</th>
                <th className="px-4 py-3 text-left">Toner</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Cantidad</th>
                <th className="px-4 py-3 text-left">Fecha</th>
                <th className="px-4 py-3 text-left">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3 font-medium">{order.areaName}</td>
                  <td className="px-4 py-3">{order.tonerName}</td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    {order.cantidad}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(order.fecha).toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    {order.isDelivered ? (
                      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        Entregado
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                        Pendiente
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {order.isDelivered && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={loading}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Cancelar entrega"
                      >
                        ✕
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No hay órdenes con esos filtros
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleDownloadReport}
          className="bg-emerald-600 hover:bg-emerald-800
          text-white font-medium px-6 py-3 rounded-xl
          shadow-md hover:shadow-lg transition"
        >
          ⬇ Descargar reporte
        </button>
      </div>
    </div>
  );

}

export default HistoryOrders;
