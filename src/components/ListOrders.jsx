import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("")
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/orders`, {
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelivery = async (orderId) => {
    try {
      await axios.put(`${apiUrl}/api/orders/${orderId}/deliver`, {}, {
        withCredentials: true,
      });
      const response = await axios.get(`${apiUrl}/api/orders`, {
        withCredentials: true,
      });
      setOrders(response.data);
      setConfirmationMessage("Orden entregada")

      setTimeout(() => setConfirmationMessage(""), 1500)

      setErrorMessage("");
    } catch (error) {
      console.error("Error marking order as delivered:", error);
      setErrorMessage(error.response?.data?.message || "Error marking order as delivered");
      setTimeout(() =>
        setErrorMessage("")
        , 1500)
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.delete(`${apiUrl}/api/remove/${orderId}`, {
        withCredentials: true,
      });
      const response = await axios.get(`${apiUrl}/api/orders`, {
        withCredentials: true,
      });
      setOrders(response.data);
      setConfirmationMessage("Orden cancelada");

      setTimeout(() => setConfirmationMessage(""), 750);

      setErrorMessage("");
    } catch (error) {
      console.error("Error canceling order:", error);
      setErrorMessage(error.response?.data?.message || "Error canceling order");
      setTimeout(() => setErrorMessage(""), 1500);
    }
  };

  // Filtrar órdenes no entregadas
  const filteredOrders = orders.filter(order => !order.isDelivered);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {errorMessage && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-center shadow">
          {errorMessage}
        </div>
      )}
      {confirmationMessage && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-center shadow">
          {confirmationMessage}
        </div>
      )}
      {filteredOrders.length === 0 ? (
        <div className="text-center text-gray-500 mt-16">
          🎉 No hay órdenes pendientes
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl
              border border-gray-200 dark:border-gray-700
              p-5 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    {order.tonerName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Área: {order.areaName}
                  </p>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                  Pendiente
                </span>
              </div>

              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Cantidad:</strong> {order.cantidad}</p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(order.fecha).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleDelivery(order._id)}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-700 
                  text-white py-2 rounded-lg font-medium
                  transition"
                >
                  ✓ Entregar
                </button>

                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="flex-1 bg-red-500 hover:bg-red-700 
                  text-white py-2 rounded-lg font-medium
                  transition"
                >
                  ✕ Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
