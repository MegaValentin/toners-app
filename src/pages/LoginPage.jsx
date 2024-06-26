import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


function LoginPage() {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const { signin, errors: signinErrors, isAuthenticated } = useAuth()
    const  navigate  = useNavigate()
    const onSubmit = handleSubmit((data) => {
      signin(data);
    });
  
    useEffect(() =>{
      if(isAuthenticated) navigate('/')
    },[isAuthenticated])
  
    return (
      <div className="flex h-screen items-center justify-center">
        
        <div className="bg-sky-900 p-8 relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg size-4/5 max-h-96 flex justify-center  ">
  
  
          <form onSubmit={onSubmit} className="w-11/12 text-sm text-left rtl:text-right  text-gray-400 mb-10">
          <h2 className="text-center mb-10 text-2xl font-bold text-white"> INICIAR SESION </h2>
  
            <input
              type="username"
              {...register("username", { required: true })}
              className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="username"
            />
  
            {errors.username && <p className="text-red-500">Username is required</p>}
  
            <input
              type="password"
              {...register("password", { required: true })}
              className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Password"
            />
  
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
  
  <div className="flex justify-center">
          <button
            type="submit"
            className="w-3/4 bg-teal-500 hover:bg-teal-800 hover:border hover:border-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>

          </div>
          </form>
  
          
        </div>
      </div>
    );
  }

export default LoginPage;
