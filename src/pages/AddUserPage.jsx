import React, { useState } from "react";
import AddUserForm from '../components/AddUserForm';
import UnauthorizedAcess from "../components/UnauthorizedAccess";
import UsersTable from '../components/UsersTable';
import ButtonClose from "../components/ButtonCloese";
import Modal from "react-modal";
import { useAuth } from "../context/AuthContext";

const AddUserPage = () => {
  const { user } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  

  return (
    <div className='bg-transparent p-8 rounded-lg w-full mt-10'>
    {user.role === 'superadmin' && (
      <>
      <AddUserForm/>
      <div className=" ml-1 mt-6">
        <button
          onClick={openModal}
          className="text-gray-500 hover:text-gray-700 "
        >
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-list"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>
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
        <UsersTable />
      </Modal>

      </>
      
      )}
      {user.role === 'empleado' && (
        <UnauthorizedAcess />
      )}
    </div>
  );
};

export default AddUserPage;
