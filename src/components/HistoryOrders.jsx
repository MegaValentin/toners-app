import React, { useState, useEffect } from 'react';
import axios from 'axios';


const HistoryOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
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

    return (
    <div className="flex justify-center">
      <div className="w-full">

      <div className="table-container overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400 table-fixed-header ">
          <thead className="text-xs  uppercase bg-sky-900 ">
            <tr className="text-white">
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Area</div>
              </th>
              <th scope="col" className="px-6 py-3">
                Toner
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Cantidad</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Fecha</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Estado</div>
              </th>
              <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Acciones</div>
                </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((orders) => (
              <tr key={orders._id} className="border-b bg-white  text-black">
                <td className="px-4 py-2 text-gray-900">{orders.areaName}</td>
                <td className="px-6 py-4 font-medium whitespace-nowrap ">
                  {orders.tonerName}
                </td>
                <td className="px-4 py-2 text-gray-900">{orders.cantidad}</td>
                <td className="px-4 py-2 text-gray-900">{orders.fecha}</td>
                <td className="px-4 py-2 text-gray-900">{orders.isDelivered ? "Entregado" : "No Entregado"}</td>
                
                <td className="px-4 py-2 text-gray-900">
                    {orders.isDelivered && (
                      <button
                        onClick={() => handleCancelOrder(orders._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading}
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      </div>

    </div>
    )

}

export default HistoryOrders;