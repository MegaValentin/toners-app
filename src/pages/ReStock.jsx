import React from 'react';
import FormReStock from '../components/FormReStock';
import { useAuth } from "../context/AuthContext"
import UnauthorizedAcess from '../components/UnauthorizedAccess';

const ReStock = () => {
  const {user}=useAuth()

  return (
    <div className='bg-transparent p-8 rounded-lg w-full mt-10 gap-6  h-96'>
      {user.role === 'admin' && (
        <>
      <h1 className="text-center text-2xl font-bold mb-6 uppercase">ReStock de Toner</h1>
       <FormReStock/>
        </>
      )}
       {user.role === 'empleado' && (
        <UnauthorizedAcess/>
      )}
    </div>

  )
};

export default ReStock;