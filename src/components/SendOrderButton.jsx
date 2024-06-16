import React from 'react';
import axios from 'axios';


const SendOrderButton = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const handleSendOrder = async () => {
        try {
          const response = await axios.post(`${apiUrl}/api/sendorder`);
          alert(response.data);
        } catch (error) {
          console.error('Error sending order:', error);
          alert('Failed to send order.');
        }
      };
    
      return (
        <button
          onClick={handleSendOrder}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Enviar Pedido Recomendado
        </button>
      );

}

export default SendOrderButton;