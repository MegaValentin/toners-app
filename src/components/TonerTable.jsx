import React, { useEffect, useState } from "react";
import axios from "axios";
import EditTonerModal from './EditTonerModal';
import IconEdit from "./Icons/IconEdit";
import IconDelete from "./Icons/IconDelete";

const TonersTable = () => {
  const [toners, setToners] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedToner, setSelectedToner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
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

  const openModal = (id) => {
    setCurrentAction({id})
    setShowModal(true)
  }

  const confirmAction = () => {
    handleDelete(currentAction.id)
    setShowModal(false);
  }

  return (
    
    <div className="flex justify-center ">
      <div className="w-full">

      <div className="table-container overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400 ">
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
                    onClick={() => openModal(toner._id)}
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
       {showModal && (
                    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 space-y-4">
                            <h2 className="text-lg font-semibold">¿Estas seguro de elimar esta orden?</h2>

                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className={`px-4 py-2 rounded hover:opacity-90 bg-red-600 text-white hover:bg-red-700`}
                                    onClick={confirmAction}
                                >
                                    {currentAction.action === "delete" ? "Eliminar" : "SI"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}


    </div>
  );
};

export default TonersTable;
