import React, { useEffect, useState } from 'react';
import axios from 'axios';


const RecalledToner = () => {
  
  const [areas, setAreas] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    
    useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/history`, {
          withCredentials: true, 
        });
        setAreas(response.data);
      } catch (error) {
        console.error('Error fetching area usage data:', error);
      }
    };
    
    fetchAreas();
    }, []);
    
    return(

      <div className="flex justify-center p-4 sm:p-8">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 relative h-full mb-3 max-h-96 overflow-y-auto custom-scrollbar w-full sm:w-auto">
        {areas.map((area) => (
          <li key={area._id} className="p-2 sm:mr-4">
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <div className="flex-1 min-w-0">
                <h2 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{area.areaName}</h2>
              </div>
              <ul className="inline-flex flex-wrap items-center text-xs sm:text-base font-semibold gap-2 sm:gap-4">
                {area.toners.map((toner) => (
                  <li key={toner.toner} className='p-1 sm:p-2'>
                    <span className="text-xs sm:text-sm font-medium text-sky-500 truncate">{toner.tonerName}</span>: {toner.cantidad}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>

    )
    
}


export default RecalledToner;