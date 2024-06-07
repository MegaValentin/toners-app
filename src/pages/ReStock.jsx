import React from 'react';
import FormReStock from '../components/FormReStock';

const ReStock = () => {
 

  return (
    <div className='bg-transparent p-8 rounded-lg w-full mt-10 gap-6  h-96'>
      <h1 className="text-center text-2xl font-bold mb-6 uppercase">ReStock de Toner</h1>
       <FormReStock/>
    </div>

  )
};

export default ReStock;