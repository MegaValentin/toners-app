import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Areas = () => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get('http://localhost:3500/api/history');
        setAreas(response.data);
      } catch (error) {
        console.error('Error fetching area usage data:', error);
      }
    };

    fetchAreas();
  }, []);

  return (
    <div className='bg-transparent p-8 rounded-lg w-full mt-10'>
      <h1 className="text-3xl font-bold mb-4">Gestión de Áreas</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
        {areas.map((area) => (
          <div key={area._id} className=' max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow '>
            <h2 className='mb-2 text-xl md:text-2xl lg:text-1xl font-bold tracking-tight text-gray-900 text-center uppercase'>{area.areaName}</h2>
            <div>
              <h3 className='mb-3 text-sm md:text-base lg:text-lg font-normal text-gray-700 '>Toners:</h3>
              <ul>
                {area.toners.map((toner) => (
                  <li key={toner.toner}>
                    <span className='text-sm md:text-base lg:text-lg'>{toner.tonerName}</span>: {toner.cantidad}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
};

export default Areas;