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
      <table className="w-full text-sm text-left rtl:text-right table-fixed-header">
            <thead className="bg-sky-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Marca
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Tóner
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {toners.map((toner) => (
                <tr
                  key={toner._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-100 font-medium">
                    {toner.marca}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {toner.toner}
                  </td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      toner.cantidad === 0
                        ? "text-red-600"
                        : toner.cantidad < 3
                        ? "text-yellow-500"
                        : "text-green-600"
                    }`}
                  >
                    {toner.cantidad}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(toner)}
                      className="flex items-center justify-center p-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition"
                    >
                      <IconEdit />
                    </button>
                    <button
                      onClick={() => openModal(toner._id)}
                      className="flex items-center justify-center p-2 bg-red-100 hover:bg-red-200 rounded-lg transition"
                    >
                      <IconDelete />
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl max-w-sm w-full space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              ¿Estás seguro de eliminar este tóner?
            </h2>

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={confirmAction}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default TonersTable;
