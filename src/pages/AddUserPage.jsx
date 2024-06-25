import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import UnauthorizedAcess from "../components/UnauthorizedAccess";

const AddUserPage = () => {
  const { user } = useAuth();
  const { addUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser(formData);
    setSuccessMessage('User added successfully!');
    setFormData({
      username:'',
      password:'',
      role:''
    })
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000); // Clear the success message after 3 seconds
  };

  return (
    <div className='bg-transparent p-8 rounded-lg w-full mt-10'>
    {user.role === 'admin' && (
      <>
      <div className='flex justify-center'>
      
        <div className="bg-sky-900 p-8 relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg size-4/5 max-h-96 flex justify-center ">
          <form onSubmit={handleSubmit}
          className="w-11/12 text-sm text-left rtl:text-right  text-gray-400 mb-10 "
          >
            <input
            className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <input
            className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <select
            className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="empleado">Empleado</option>
            </select>
            <div className="flex justify-center">
          <button
            type="submit"
            className="w-3/4 bg-teal-500 hover:bg-teal-800 hover:border hover:border-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Agregar Usuario
          </button>

          </div>
          </form>
          {successMessage && <p>{successMessage}</p>}
        </div>
        </div>
        </>
      )}
      {user.role === 'empleado' && (
        <UnauthorizedAcess />
      )}
    </div>
  );
};

export default AddUserPage;
