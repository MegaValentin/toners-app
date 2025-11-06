import { useState } from "react";
import axios from "axios";
import IconEdit from "./Icons/IconEdit";
import IconDelete from "./Icons/IconDelete";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ListPrints = ({ prints, onPrintUpdated, onPrintDeleted }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPrint, setSelectedPrint] = useState(null);

  const openModal = (print) => {
    setSelectedPrint(print);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPrint(null);
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPrint) return;
    try {
      await axios.delete(`${apiUrl}/api/print/${selectedPrint._id}`, { withCredentials: true });
      onPrintDeleted();
      closeModal();
    } catch (error) {
      console.error("Error al eliminar impresora:", error);
      closeModal();
    }
  };

  return (
    <div className="overflow-x-auto relative">
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border">Marca</th>
            <th className="py-2 px-4 border">Modelo</th>
            <th className="py-2 px-4 border">Tóner</th>
            <th className="py-2 px-4 border text-center"></th>
          </tr>
        </thead>
        <tbody>
          {prints.length > 0 ? (
            prints.map((print) => (
              <tr key={print._id}>
                <td className="py-2 px-4 border">{print.marca}</td>
                <td className="py-2 px-4 border">{print.modelo}</td>
                <td className="py-2 px-4 border">
                  {print.toner?.toner || print.tonerName}
                </td>
                <td className="py-2 px-4 border text-center">
                  <button
                    onClick={() => onPrintUpdated(print)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2 transition"
                  >
                    <IconEdit />
                  </button>
                  <button
                    onClick={() => openModal(print)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition"
                  >
                    <IconDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No se encontraron impresoras
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-lg font-semibold mb-3">
              ¿Seguro que querés eliminar esta impresora?
            </h2>
            <p className="text-gray-700 mb-6">
              <strong>{selectedPrint?.marca}</strong> - {selectedPrint?.modelo}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                Sí, eliminar
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListPrints;