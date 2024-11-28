import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import printer from "../assets/printer.svg"
import IconCpu from "../components/Icons/IconCpu";

function LoginPage() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  return (
    

      <div className="flex flex-col items-center justify-center px-5 py-4 mx-auto  lg:py-0  ">
        <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          <IconCpu  />
        </a>
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl "> INICIAR SESION </h2>

        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
          
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



      </div>
    
  );
}

export default LoginPage;
