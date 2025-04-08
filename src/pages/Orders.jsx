import React, { useState } from "react";
import OrderForm from '../components/OrderForm';
import Modal from "react-modal";
import HistoryOrders from "../components/HistoryOrders";
import ButtonClose from "../components/ButtonCloese";
import ListOrders from "../components/ListOrders";
import ListOrdersUni from "../components/ListOrdersUni";
import OrderFormUni from "../components/OrderFormUni";
import { useAuth } from "../context/AuthContext"

const Orders = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [useOrderFormUni, setUseOrderFormUni] = useState(false);
  const { user } = useAuth()

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const toggleForm = () => {
    setUseOrderFormUni((prev) => !prev);
  };

  return (
    <div className="bg-transparent p-4 sm:p-8 rounded-lg w-full mt-6 sm:mt-10">  
      <h2 className="text-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">AGREGAR ORDEN</h2>

      {(user.role === 'admin' || user.role === 'superadmin') && (
        <>
          
          {useOrderFormUni ? <OrderFormUni /> : <OrderForm />}

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
            <button
              onClick={openModal}
              className="text-gray-500 hover:text-gray-700 flex items-center space-x-1 p-2"
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-history mr-1">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 8l0 4l2 2" />
                <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
              </svg>
              <span>Ver Historial de Órdenes</span>
            </button>

            <button 
              onClick={toggleForm} 
              className="mt-4 sm:mt-0 p-3 bg-teal-600 hover:bg-teal-900 text-white rounded shadow-lg text-lg font-medium"
            >
              {useOrderFormUni ? "Orden de Toner" : "Orden de Unidad de Imagen"}
            </button>
          </div>

           
           <ListOrders />
          <ListOrdersUni />

          
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Historial de Órdenes"
            className="modal-content p-4 sm:p-9 bg-white rounded-md shadow-lg overflow-auto"
            overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          >
            <div className="flex justify-end">

            <ButtonClose onClick={closeModal} />
            </div>
            <div className="mt-4">
    <HistoryOrders />
  </div>
          </Modal>
        </>
      )}
      
      {user.role === 'empleado' && (
        <OrderForm />
      )}
    </div>
  );
};

export default Orders;
