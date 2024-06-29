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
      
      <div className="flex justify-center">

      <ul className=" divide-y divide-gray-200 dark:divide-gray-700">
        
          {areas.map((area) => (
           <li key={area._id} className="pb-3 sm:pb-4 mt-3">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-44">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-44">
          <p className='"text-sm font-medium text-gray-900 truncate"'>{area.areaName}</p>
            
            <div className="flex-1 min-w-0">

            </div>
            </div>

            <div >
              
              <ul className='flex flex-row sapace-x-4'>
                {area.toners.map((toner) => (
                  <li key={toner.toner} className="p-2 ">
                    <span className='text-sm md:text-base lg:text-lg'>{toner.tonerName}</span>: {toner.cantidad}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </li>
        ))}
          
          
         
      </ul>
    </div>

        
    )
    
}


export default RecalledToner;