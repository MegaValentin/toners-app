import { useState } from "react";
import Modal from "react-modal";
import ButtonClose from "../components/ButtonCloese";
import ModalAddPrint from "../components/ModalAddPrint";
import ListPrints from "../components/ListPrints";

const PrintPage = () => {
    const [ modalIsOpen, setModalIsOpen ] = useState(false)
    const [ print, setPrint ] = useState(false)
    const [ showPrintTable, setShowPrintTable ] = useState(true)

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const handlePrintAdded = (newPrint) => {
        setPrint((prevPrint) => [...prevPrint, newPrint])
    }
    
    return( 
        <div className="bg-transparent p-8 rounded-lg w-full  mt-10">
            <button
            onClick={ openModal } 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
            
            AGREGAR IMPRESORA
          </button>
            
            <ListPrints prints={print} setPrints={setPrint}/>

            <Modal
                isOpen = {modalIsOpen}
                onAfterClose={closeModal}
                contentLabel= "Agregar Impresora"
                className="modal"
                overlayClassName = "overlay"
                >
                <ButtonClose onClick={closeModal}/>
                <ModalAddPrint onPrintAdded={handlePrintAdded} onClose={closeModal}/>
            </Modal>


        </div>
    )
}

export default PrintPage;