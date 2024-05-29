import React, { useState } from "react";
import OrderForm from '../components/OrderForm';
import Modal from "react-modal";
import HistoryOrders from "../components/HistoryOrders";

const Orders = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };



  return (
    <div className="bg-white p-8 rounded-lg w-full mt-10 ">  
      <h2 className="text-center text-2xl font-bold mb-6">AGREGAR ORDEN</h2>
      <OrderForm />
      <div className=" ml-1 mt-6">
        <button
          onClick={openModal}
          className="text-gray-500 hover:text-gray-700 "
        >
          <svg xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="icon icon-tabler icons-tabler-outline icon-tabler-history">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 8l0 4l2 2" />
            <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
          </svg>
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
        <HistoryOrders />
      </Modal>
    </div>

  )
};

export default Orders;