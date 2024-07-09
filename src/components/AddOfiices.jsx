import React, { useState} from "react";
import axios from 'axios'

const AddOffice = ({ onOfficeAdded, onClose }) => {
    const [areaName, setAreaName] = useState('')
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post(`${apiUrl}/api/addoffice`, {
                area : areaName
              }, {
                withCredentials: true, 
              })
              onOfficeAdded(response.data)
              window.location.reload()
        }catch(error){
            console.error('Error adding Office: ', error)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center ">
        
  
        <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        
          <div className="mb-5">
  
            <input type="text"
              id="areaName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nombre del area"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              required />
          </div>
          
  
            
          <button type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            AGREGAR
          </button>
        </form>
      </div>
    )
}

export default AddOffice