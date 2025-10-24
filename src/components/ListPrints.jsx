import IconEdit from "./Icons/IconEdit";
import IconDelete from "./Icons/IconDelete";


const ListPrints = ({ prints, onDelete, onEdit }) => {
  return (
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
                  Modelo
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Toner
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  
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
                      onClick={() => onEdit(print)}
                      className="flex items-center justify-center p-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition"
                    >
                      <IconEdit />
                    </button>
                    <button
                      onClick={() => onDelete(print._id)}
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
    </div>
  );
};

export default ListPrints;