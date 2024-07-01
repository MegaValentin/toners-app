import React, { useState } from "react";
import Modal from "react-modal";
import RecalledToner from '../components/RecalledToner';
import StockToner from "../components/StockTonerCompleto";
import ButtonClose from "../components/ButtonCloese";
import OfficeTable from "../components/OfficeTable";
import AddOffices from "../components/AddOffices";
import { useAuth } from "../context/AuthContext"
import UnauthorizedAcess from "../components/UnauthorizedAccess";
import ReportGenerator from "../components/ReportGenerator";

const Areas = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [officesModalOpen, setOfficesModalOpen] = useState(false)
  const [area, setArea] = useState([]);
  const {user} = useAuth()
  
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  const openModalOffice = () => {
    setOfficesModalOpen(true)
  }
  const closeModelOffice = () => {
    setOfficesModalOpen(false)
  }

  const handleOfficeAdded = (newOffice) => {
    setArea((prevOffice) => [...prevOffice, newOffice]);

  };

  return (
    <div className='bg-transparent p-8 rounded-lg w-full mt-10'>
      {user.role === 'admin' && (
        <>
      <h1 className="text-3xl font-bold mb-4">Gestión de Áreas</h1>
      <div className="flex item-center">
      <div className=" ml-1">
          <button
            onClick={openModal}
            className="text-gray-500 hover:text-gray-700 "
          >
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-users-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
          </button>
        </div>
        <div className=" ml-1 ">
          <button
            onClick={openModalOffice}
            className="text-gray-500 hover:text-gray-700 "
          >
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-users-group"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
          </button>
        </div>
      
      
      </div>
        <div className="divide-y divide-gray-200">

        <RecalledToner />
        <ReportGenerator/>
        </div>

        <Modal

        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Agregar Area"
        className="modal"
        overlayClassName="overlay"
      >
        <ButtonClose onClick={closeModal} />
        <AddOffices onOfficeAdded={handleOfficeAdded} onClose={closeModal}/>
        
      </Modal>
      
      <Modal

        isOpen={officesModalOpen}
        onRequestClose={openModalOffice}
        contentLabel="Tabla Areas"
        className="modal"
        overlayClassName="overlay"
      >
        <ButtonClose onClick={closeModelOffice} />
        <h2>Tabla Areas</h2>
        <OfficeTable areas={area} setAreas={setArea}/>
      </Modal>
        </>
      )}
       {user.role === 'empleado' && (
        <UnauthorizedAcess/>
      )}
      
    </div>

  )
};

export default Areas;