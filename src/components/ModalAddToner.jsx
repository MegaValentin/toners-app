import React from 'react';

const AddTonerModal = () => {
  return (
    
    
    <div className="bg-white p-8 rounded-lg  w-full max-w-md">
      <h2 className='text-center text-2xl font-bold mb-6'>AGREGAR TONER</h2>
      
      <form className="space-y-5">
        <div className="mb-5">
          
          <input type="text" id="tonerName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nombre del toner" required />
        </div>
        <div className="mb-5">
          
          <input type="number" id="cantidad" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Cantidad" required />
        </div>
        <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">AGREGAR</button>
      </form>
    </div>
 

        

  );
};

export default AddTonerModal;