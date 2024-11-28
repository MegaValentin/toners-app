import React, { useEffect, useState } from "react";
import axios from "axios";
import EditTonerModal from './EditTonerModal';
import IconEdit from "./Icons/IconEdit";
import IconDelete from "./Icons/IconDelete";

const TonersTable = () => {
  const [toners, setToners] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedToner, setSelectedToner] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  
  const fetchToners = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/toners`, {
        withCredentials: true, 
      });
      setToners(response.data);
    } catch (error) {
      console.error("Error fetching toners:", error);
    }
  };

  const handleEdit = (toner) => {
    console.log(toner);
    setSelectedToner(toner);
    setEditModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalIsOpen(false);
    setSelectedToner(null);
    fetchToners();
  };

  useEffect(() => {
    fetchToners();
  }, []);

 
  const handleDelete = async (id) => {
    try {
     
      await axios.delete(`${apiUrl}/api/toner/${id}`, {
        withCredentials: true, 
      });
      // Eliminar el toner de la lista toners
      
      setToners(toners.filter((toner) => toner.id !== id));
      fetchToners();
    } catch (error) {
      console.error("Error deleting toner:", error);
    }
  };

  return (
    
    <div className="flex justify-center ">
      <div className="w-full">

      <div className="table-container overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400 table-fixed-header">
          <thead className="text-xs  uppercase bg-sky-900 ">
            <tr className="text-white">
            <th scope="col" className="px-6 py-3">
                Marca
              </th>
              <th scope="col" className="px-6 py-3">
                Toner
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">cantidad</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {toners.map((toner) => (
              <tr key={toner._id} className="border-b bg-white  text-black">
                <td className="px-6 py-4 font-medium whitespace-nowrap ">
                  {toner.marca}
                </td>
                <td className="px-6 py-4 font-medium whitespace-nowrap ">
                  {toner.toner}
                </td>
                <td className="px-4 py-2 text-gray-900">{toner.cantidad}</td>
                <td className="px-4 py-2 text-gray-900">
                  <button
                    onClick={() => handleEdit(toner)}
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                  >
                    <IconEdit/>
                  </button>
                  <button
                    onClick={() => handleDelete(toner._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <IconDelete/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      <EditTonerModal
        toner={selectedToner}
        isOpen={editModalIsOpen}
        onClose={handleCloseModal}
        onSave={fetchToners}
      />

    </div>
  );
};

export default TonersTable;
