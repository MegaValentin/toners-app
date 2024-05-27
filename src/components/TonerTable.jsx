import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TonersTable = () => {
  const [toners, setToners] = useState([]);

  useEffect(() => {
    // Función para obtener los toners desde la API
    const fetchToners = async () => {
      try {
        const response = await axios.get('http://localhost:3500/api/toners'); // Actualiza la URL a la de tu API
        setToners(response.data);
      } catch (error) {
        console.error('Error fetching toners:', error);
      }
    };

    fetchToners();
  }, []);

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full bg-white  border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Toner</th>
            <th className="px-4 py-2 border-b">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {toners.map((toner) => (
            <tr key={toner._id}>
              <td className="px-4 py-2 border-b text-center">{toner.toner}</td>
              <td className="px-4 py-2 border-b text-center">{toner.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TonersTable;