import React, { useState } from "react";
import TonersTable from "../components/TonerTable";
import Modal from "react-modal";
import AddTonerModal from "../components/ModalAddToner";
import ButtonClose from "../components/ButtonCloese";
const Toners = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [toner, setToner] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleTonerAdded = (newToner) => {
    setToner((prevToners) => [...prevToners, newToner]);
    
  };

  return (
    <div className="bg-transparent p-8 rounded-lg w-full  mt-10">
      <h2 className="text-center text-2xl font-bold mb-6">
        TONERS
      </h2>
      <TonersTable toners={toner} setToners={setToner} />
      <div className="text-center mt-6">
        <button
          onClick={openModal}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Agregar Toner
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
    </div>
  );
};

export default Toners;
