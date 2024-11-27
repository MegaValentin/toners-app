import React, {useState} from 'react';
import RestockForm from '../components/FormReStock'
import RestockFormUni from '../components/FormReStockUni';
import { useAuth } from "../context/AuthContext"
import UnauthorizedAcess from '../components/UnauthorizedAccess';

const ReStock = () => {
  const {user}=useAuth()
  const [ useFormUni, setUseFormUni ] = useState(false)
  
  const toggleForm = () => {
    setUseFormUni((prev) => !prev)
  }

  return (
    <div className='bg-transparent p-8 rounded-lg w-full mt-10 gap-6 '>
      {(user.role === 'admin' || user.role === 'superadmin') && (
        <>
        <button 
              onClick={toggleForm} 
              className="mt-4 sm:mt-0 p-3 bg-teal-600 hover:bg-teal-900 text-white rounded shadow-lg text-lg font-medium"
            >
              {useFormUni ? "Toners": "Unidad de Imagen"}
            </button>

      <h1 className="text-center text-2xl font-bold mb-6 uppercase">ReStock de {useFormUni ? "Unidad de Imagen" : "Toners"}</h1>
        {useFormUni ?  <RestockFormUni/>: <RestockForm/>  }
      
       
        </>
      )}
       {user.role === 'empleado' && (
        <UnauthorizedAcess/>
      )}
    </div>

  )
};

export default ReStock;