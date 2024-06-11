import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistoryOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        
        try {
            const response = await axios.get("http://localhost:3500/api/orders");
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching toners:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

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