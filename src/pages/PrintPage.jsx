import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import ButtonClose from "../components/ButtonCloese";
import ModalAddPrint from "../components/ModalAddPrint";
import ListPrints from "../components/ListPrints";
import PrintFilters from "../components/PrintFilters";
import Pagination from "../components/Pagination";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const PrintPage = () => {
  const [prints, setPrints] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    limit: 10,
    sortBy: "marca",
    order: "asc",
  });
  const [pagination, setPagination] = useState({ totalPages: 1 });

  // 🔹 Obtener datos desde el backend
  const fetchPrints = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/prints/filt`, {
        params: filters,
      });
      setPrints(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error al obtener impresoras:", error);
    }
  };

  useEffect(() => {
    fetchPrints();
  }, [filters]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // 🔹 Cuando agregás una impresora
  const handlePrintAdded = () => {
    fetchPrints();
    closeModal();
  };

  // 🔹 Cuando editás una impresora
  const handlePrintUpdated = () => {
    fetchPrints();
  };

  // 🔹 Cuando eliminás una impresora
  const handlePrintDeleted = () => {
    fetchPrints();
  };

  return (
    <div className="bg-transparent p-8 rounded-lg w-full mt-10">
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        AGREGAR IMPRESORA
      </button>

      {/* 🔍 Filtros */}
      <PrintFilters filters={filters} setFilters={setFilters} />

      {/* 📋 Lista */}
      <ListPrints
        prints={prints}
        onPrintUpdated={handlePrintUpdated}
        onPrintDeleted={handlePrintDeleted}
      />

      {/* 📄 Paginación */}
      <Pagination pagination={pagination} setFilters={setFilters} />

      {/* ➕ Modal para agregar */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Agregar Impresora"
        className="modal"
        overlayClassName="overlay"
      >
        <ButtonClose onClick={closeModal} />
        <ModalAddPrint onPrintAdded={handlePrintAdded} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default PrintPage;
