import { useEffect, useState } from "react"
import axios from "axios"
import IconDelete from "./Icons/IconDelete"
import IconEdit from "./Icons/IconEdit"


const ListPrints = () => {
    const [ prints, setPrints ] = useState([])
    const [ editPrintModalOpen, setEditPrintModalOpen ] = useState(false)
    const [ selectedPrint, setSelectedPrint ] = useState(null)
    const [ showModal, setShowModal ] = useState(false)
    const [ currentAction, setCurrentAction ] = useState(null)
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const fetchPrints = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/prints`, {
                withCredentials: true
            })
            setPrints(response.data)
            
        } catch (error) {
            console.error("Error fetching prints: ", error)
        }
    }

    const handleEdit = (print) => {
        console.log(print)
        setSelectedPrint(print)
        setEditPrintModalOpen(true)
    }

    const handleCloseModal = () => {
        setEditPrintModalOpen(false)
        setSelectedPrint(null)
        fetchPrints()
    }

    useEffect(() => {
        fetchPrints()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/print/${id}`, {withCredentials: true})

            setPrints(prints.filter((print) => print.id !== id))
            fetchPrints()
        } catch (error) {
            console.error("Error deleting print: ", error)
        }
    }

    const openModal = (id) => {
        setCurrentAction({id})
        setShowModal(true)
    }

    const confirmAction = () => {
        handleDelete(currentAction.id)
        setShowModal(false)
    }

    return(
        <div className="flex justify-center">
            <div className="w-full">
                <div className="table-container overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right table-fixed-header">
                        <thead className="bg-shy-900 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                    Marca
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                    Moledo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                    Toner
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {prints.map((print) => (
                               <tr
                               key={print._id}
                               className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                             >
                               <td className="px-6 py-4 text-gray-900 dark:text-gray-100 font-medium">
                                        {print.marca}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100 font-medium">
                                        {print.modelo}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100 font-medium">
                                        {print.tonerName}
                                    </td>

                                    <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(toner)}
                      className="flex items-center justify-center p-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition"
                    >
                      <IconEdit />
                    </button>
                    <button
                      onClick={() => openModal(print._id)}
                      className="flex items-center justify-center p-2 bg-red-100 hover:bg-red-200 rounded-lg transition"
                    >
                      <IconDelete />
                    </button>
                  </td>
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl max-w-sm w-full space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              ¿Estás seguro de eliminar esta impresora?
            </h2>

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={confirmAction}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
    )

}

export default ListPrints;