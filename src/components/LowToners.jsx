import React, { useEffect, useState } from "react";
import axios from "axios";
import OkMessage from "./OkMessage";



const LowToners = () => {
  
  const [toners, setToners] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchLowToners = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/low-toner`, {
          withCredentials: true, // Ensure credentials (cookies) are sent
        });
        setToners(response.data);
      } catch (error) {
        console.error('Error fetching low toner', error);
      }
    };
  
    fetchLowToners();
  }, []);
  return (
    
    <div className="flex justify-center">

      {toners.length === 0 ? (
        <OkMessage />
      ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">

            { toners.map((toner) => (
             <li key={toner._id} className="pb-3 sm:pb-4 mt-3">
               <div className=" flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-96">
               <div className="flex-1 min-w-0">
                   <h2 className="text-sm font-medium text-gray-900 truncate">
                     {toner.toner}
                   </h2>
     
               </div>
               <div className="inline-flex items-center text-base font-semibold">
     
                   <p className="text-sm font-medium text-red-500 truncate">
                     Cantidad: {toner.current}
                   </p>
               </div>
     
     
               </div>
     
             </li>
                 
             ))}
          </ul>
        )}
        
        </div>
   
  );
};

export default LowToners;
