import React from 'react';
import UploadExcel from '../components/UploadExcel';

const StockIdeal = () => {
 

  return (
    <div className='bg-transparent p-8 rounded-lg w-full mt-10'>
      <h1 className="text-3xl font-bold mb-4">PEDIDO RECOMENDADO</h1>
      <UploadExcel />
    </div>

  )
};

export default StockIdeal;