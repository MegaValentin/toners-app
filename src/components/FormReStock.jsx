import React, { useState, useEffect } from 'react';
import axios from 'axios';


const RestockForm = () => {
  const [toners, setToners] = useState([]);
  const [restockData, setRestockData] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("")
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  
  useEffect(() => {
    const fetchToners = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/toners`, {
          withCredentials: true, 
        });
        setToners(response.data);
        setRestockData(response.data.reduce((acc, toner) => {
          acc[toner._id] = 0; // Inicializa la cantidad de restock a 0 para cada tóner
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching toners:', error);
      }
    };

    fetchToners();
  }, []);

  const handleInputChange = (tonerId, cantidad) => {
    setRestockData({
      ...restockData,
      [tonerId]: cantidad,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restocks = Object.keys(restockData).map((tonerId) => ({
      tonerId,
      cantidad: restockData[tonerId],
    }));

    try {
      const response = await axios.post(`${apiUrl}/api/restockall`, { restocks }, {
        withCredentials: true, 
      });
      console.log(response);

      setConfirmationMessage("Restock guardado exitosamente")
      setTimeout(() => setConfirmationMessage(""), 3000)

    } catch (error) {
      console.error('Error completing restock:', error);
      alert('Error completing restock');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-sky-900 p-8 size-4/5  sm:rounded-lg flex justify-center">

        <form onSubmit={handleSubmit} className="w-11/12 text-sm text-left rtl:text-right  text-gray-400 mb-10 ">
          <div className='relative  h-full mb-3'>
            {toners.map((toner) => (
              <div key={toner._id} className="mb-5">
                <label className="block text-sm font-medium text-white uppercase">
                  {toner.toner}
                </label>
                <input
                  type="number"
                  min="0"
                  value={restockData[toner._id]}
                  onChange={(e) => handleInputChange(toner._id, Number(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            ))}

          </div>
          <div className="flex justify-center">

          <button
            type="submit"
            className="w-3/4 bg-teal-500 hover:bg-teal-800 hover:border hover:border-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Completar Restock
          </button>
          </div>
          {confirmationMessage && (
            <div className="mt-4 text-center text-green-500 font-semibold">
              {confirmationMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RestockForm;
