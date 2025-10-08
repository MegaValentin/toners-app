import React from 'react';
import PedidoRecomendado from '../components/PedidoRecomendado';
import { useAuth } from "../context/AuthContext"
import UnauthorizedAcess from '../components/UnauthorizedAccess';
const StockIdeal = () => {
  const {user} = useAuth()

  return (
    <div className='bg-transparent p-8 rounded-lg w-full mt-10'>
      {(user.role === 'admin' || user.role === 'superadmin') && (
        <>
      <h1 className="text-3xl font-bold mb-4">PEDIDO RECOMENDADO</h1>
      <PedidoRecomendado/>
        </>
      )}
      {user.role === 'empleado' && (
        <UnauthorizedAcess/>
      )}
    </div>

  )
};

export default StockIdeal;