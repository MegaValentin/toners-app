import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
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
    } catch (error) {
      console.error("Error marking order as delivered:", error);
    }
  };

  // Filtrar órdenes no entregadas
  const filteredOrders = orders.filter(order => !order.isDelivered);

  return (
    <div className="flex justify-center">
    
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {filteredOrders.map((order) => (
        <li key={order._id} className="border-b py-4 flex justify-between items-center">
          <div className="max-w-sm p-6 bg-sky-500 border border-red-900 rounded-lg shadow ">
            <div>
            <p><strong>Toner:</strong> {order.tonerName}</p>
            <p><strong>Area:</strong> {order.areaName}</p>
            <p><strong>Cantidad:</strong> {order.cantidad}</p>
            <p><strong>Fecha:</strong> {new Date(order.fecha).toLocaleString()}</p>
          </div>
          <div>
            <p><strong>Estado:</strong> {order.isDelivered ? "Entregado" : "No Entregado"}</p>
            {!order.isDelivered && (
              <button
                onClick={() => handleDelivery(order._id)}
                className="bg-teal-500 text-white px-4 py-2 rounded ml-4"
              >
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
              </button>
            )}
          </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Orders;
