import React, { useState, useEffect } from 'react';
import axios from 'axios';


const OrderForm = () => {
  const [cantidad, setCantidad] = useState(1);
  const [selectedToner, setSelectedToner] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [toners, setToners] = useState([]);
  const [areas, setAreas] = useState([]);
 

  useEffect(() => {
    const fetchTonersAndAreas = async () => {
      try {
        const tonersResponse = await axios.get('http://localhost:3500/api/toners');
        const areasResponse = await axios.get('http://localhost:3500/api/offices');
        setToners(tonersResponse.data);
        setAreas(areasResponse.data);
      } catch (error) {
        console.error('Error fetching toners and areas:', error);
      }
    };

    fetchTonersAndAreas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      

      const orderData = {
        toner: selectedToner,
        cantidad,
        area: selectedArea,
        
      };
      
      console.log(orderData);

      await axios.post('http://localhost:3500/api/addorders', orderData);
      setCantidad(1);
      setSelectedToner('');
      setSelectedArea('');
      

    } catch (error) {
      console.error('Error adding order:', error);
      alert('Error adding order: ' + (error.response?.data?.message || error.message));
    }
  };

  

  
  return (
    
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="mb-5">
          <label htmlFor="toner" className="block text-sm font-medium text-gray-700">Toner</label>
          <select
            id="toner"
            value={selectedToner}
            onChange={(e) => setSelectedToner(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="" disabled>Seleccione un toner</option>
            {toners.map((toner) => (
              <option key={toner._id} value={toner._id}>{toner.toner}</option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Cantidad"
            min="1"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">Área</label>
          <select
            id="area"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="" disabled>Seleccione un área</option>
            {areas.map((area) => (
              <option key={area._id} value={area._id}>{area.area}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Agregar Orden</button>
      </form>
    
  );
};

export default OrderForm;