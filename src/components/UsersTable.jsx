import React, { useEffect, useState } from "react";
import axios from "axios";
const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const fetchUsers = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/auth/getuser`, {
            withCredentials: true, 
          });
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching toners:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
         
          await axios.delete(`${apiUrl}/api/auth/deleteuser/${id}`, {
            withCredentials: true, 
          });
          // Eliminar el toner de la lista toners
          
          setUsers(users.filter((user) => user.id !== id));
          fetchUsers();
        } catch (error) {
          console.error("Error deleting toner:", error);
        }
    };

    return (
    
        <div className="flex justify-center ">
          <div className="w-full">
    
          <div className="table-container overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-400 table-fixed-header">
              <thead className="text-xs  uppercase bg-sky-900 ">
                <tr className="text-white">
                <th scope="col" className="px-6 py-3">
                    Usuario
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Rol
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b bg-white  text-black">
                    <td className="px-6 py-4 font-medium whitespace-nowrap ">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap ">
                      {user.role}
                    </td>
                    
                    <td className="px-4 py-2 text-gray-900">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-500 hover:text-red-700"
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
                          className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 7l16 0" />
                          <path d="M10 11l0 6" />
                          <path d="M14 11l0 6" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
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
}

export default UsersTable