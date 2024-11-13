import React, { useState, useEffect } from 'react';
import axios from 'axios';


const RestockFormUni = () => {
    const [toners, setToners] = useState([]);
    const [restockData, setRestockData] = useState({});
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    
    useEffect(() => {
      const fetchToners = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/uni`, {
            withCredentials: true, 
          });
          setToners(response.data);
          setRestockData(response.data.reduce((acc, toner) => {
            acc[toner._id] = ""; // Inicializa la cantidad de restock a 0 para cada tóner
            return acc;
          }, {}));
        } catch (error) {
          console.error('Error fetching toners:', error);
        }
      };
  
      fetchToners();
    }, []);
  
    const handleInputChange = (tonerId, cantidad) => {
  
      const cantidadValue = cantidad === "" ? 0 : Number(cantidad);
  
      setRestockData({
        ...restockData,
        [tonerId]: cantidadValue,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const restocks = Object.keys(restockData).map((tonerId) => ({
        tonerId,
        cantidad: restockData[tonerId],
      }));
  
      try {
        const response = await axios.post(`${apiUrl}/api/restockuni`, { restocks }, {
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
        
          <form onSubmit={handleSubmit} className="w-11/12 max-w-md mx-auto">
            <div className="relative h-full mb-3 max-h-96 overflow-y-auto custom-scrollbar">
              {toners.map((toner) => (
                <div key={toner._id} className="relative z-0 w-full mb-5 group">
                <input  type="number"
                    min="0"
                    value={restockData[toner._id]}
                    onChange={(e) => handleInputChange(toner._id, Number(e.target.value))} 
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{toner.unidadImagen}</label>
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
      
    );
};

export default RestockFormUni;
