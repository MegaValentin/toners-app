import React, { useState } from "react";
import TonersTable from "../components/TonerTable";
import UniTable from "../components/UniTable";
import Modal from "react-modal";
import AddTonerModal from "../components/ModalAddToner";
import ButtonClose from "../components/ButtonCloese";
import StockToner from "../components/StockTonerCompleto";
import UnauthorizedAcess from "../components/UnauthorizedAccess";
import ReportToners from "../components/ReportToner";
import { useAuth } from "../context/AuthContext"

const Toners = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [uploadExcelModalIsOpen, setUploadExcelModalIsOpen] = useState(false);
  const [toner, setToner] = useState([]);
  const [uni, setUni ] = useState([])
  const [showTonersTable, setShowTonersTable] = useState(true);
  const {user} = useAuth()

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openUploadExcelModal = () => {
    setUploadExcelModalIsOpen(true);
  };

  const closeUploadExcelModal = () => {
    setUploadExcelModalIsOpen(false);
  };

  const handleTonerAdded = (newToner) => {
    setToner((prevToners) => [...prevToners, newToner]);

  };
  const toggleTable = () => {
    setShowTonersTable((prev) => !prev);
  };

  return (
    <div className="bg-transparent p-8 rounded-lg w-full  mt-10">
      {(user.role === 'admin' || user.role === 'superadmin') && (
        <>
      <button
            onClick={toggleTable}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            {showTonersTable ? "Ver Unidad de Imagen" : "Ver Toners"}
          </button>
        {showTonersTable ? (
            <h2 className="text-center text-2xl font-bold mb-6">
            TONERS
          </h2>
          ) : (
            <h2 className="text-center text-2xl font-bold mb-6">
            UNIDAD DE IMAGEN
          </h2>)}
      
          {showTonersTable ? (
            <TonersTable toners={toner} setToners={setToner} />
          ) : (
            <UniTable unis={uni} setUnis={setUni}/> // Muestra UniTable si el estado es false
          )}
      <div className="flex item-center">
        <div className="text-center mt-3 p-4">
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Agregar Toner
          </button>
        </div>
        <ReportToners/>
      </div>
        <div className=" ml-1">
          <button
            onClick={openUploadExcelModal}
            className="text-gray-500 hover:text-gray-700 "
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg>
          </button>
        </div>

      <Modal

        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Agregar Toner"
        className="modal"
        overlayClassName="overlay"
      >
        <ButtonClose onClick={closeModal} />
        <AddTonerModal onTonerAdded={handleTonerAdded} onClose={closeModal} />
      </Modal>

      <Modal

        isOpen={uploadExcelModalIsOpen}
        onRequestClose={closeUploadExcelModal}
        contentLabel="Agregar Toner"
        className="modal"
        overlayClassName="overlay"
      >
        <ButtonClose onClick={closeUploadExcelModal} />
        <h2>IMPORTAR TONERS</h2>
        <StockToner onTonerAdded={handleTonerAdded} onClose={closeUploadExcelModal} />
      </Modal>
        </>
      )}

{user.role === 'empleado' && (
        <>
          
            <UnauthorizedAcess />
        </>
      )}
    </div>
  );
};

export default Toners;
