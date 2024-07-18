import React from "react";
import LowToners from '../components/LowToners';
import { useAuth } from "../context/AuthContext"

const Home = () => {
  const { user } = useAuth()

  return(
    
  <div className="bg-transparent p-8 rounded-lg w-full mt-10 ">
    {user.role === 'empleado' && (
        <>
          
            
        </>
      )}
    {user.role === 'admin' && (
        <>
          
          <LowToners/>
            
        </>
      )}
    
  </div>
  )
}
 


export default Home;