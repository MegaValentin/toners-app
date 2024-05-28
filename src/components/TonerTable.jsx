import React, { useEffect, useState } from "react";
import axios from "axios";
import EditTonerModal from './EditTonerModal';


const TonersTable = () => {
  const [toners, setToners] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedToner, setSelectedToner] = useState(null);
  
  const fetchToners = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/toners");
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
     
      await axios.delete(`http://localhost:3500/api/toner/${id}`);
      // Eliminar el toner de la lista toners
      
      setToners(toners.filter((toner) => toner.id !== id));
      fetchToners();
    } catch (error) {
      console.error("Error deleting toner:", error);
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg size-4/5 max-h-96">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-sky-900 text-gray-400">
            <tr className="text-white">
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
                  {toner.toner}
                </td>
                <td className="px-4 py-2 text-gray-900">{toner.cantidad}</td>
                <td className="px-4 py-2 text-gray-900">
                  <button
                    onClick={() => handleEdit(toner)}
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                      <path d="M16 5l3 3" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(toner._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
