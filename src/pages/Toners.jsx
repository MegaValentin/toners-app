import React, { useState } from "react";
import TonersTable from "../components/TonerTable";
import Modal from "react-modal";
import AddTonerModal from "../components/ModalAddToner";

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
    <div className="bg-white p-8 rounded-lg w-full  mt-10">
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
        <button
          onClick={closeModal}
          className="mt-4 text-gray-600 hover:text-red-500"
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-square-x"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
            <path d="M9 9l6 6m0 -6l-6 6" />
          </svg>
        </button>
        <AddTonerModal onTonerAdded={handleTonerAdded} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default Toners;
