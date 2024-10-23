import { Link } from "react-router-dom"
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"
import logoMuni from "../assets/logoMuni.svg";
import IconAdd from "./Icons/IconAdd";
import IconPendiente from "./Icons/IconPendiente";
import IconProceso from "./Icons/IconProceso";
import IconFinish from "./Icons/IconFinish";
import IconGetOut from "./Icons/IconGetOut";
import IconRequestToner from "./Icons/IconRequestToner";
import IconAreaManegement from "./Icons/IconAreaManegement";
import IconStock from "./Icons/IconStock";
import IconIncome from "./Icons/IconIncome";
import IconRecommendedOrder from "./Icons/IconRecommendedOrder";
import IconAddUser from "./Icons/IconAddUser";
import IconMyTasks from "./Icons/IconMyTasks"

const Dashborad = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenTareas, setDropdownOpenTareas] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const toggleDropdownTareas = () => {
    setDropdownOpenTareas(!dropdownOpenTareas);
  }
  
  const handleTask = () => {
    setMenuOpen(false); 
    setDropdownOpenTareas(false); 
  }

  const handleToners = () => {
    setMenuOpen(false); 
    setDropdownOpen(false); 
  }

  const handleLogout = () => {
    logout(), 
    setMenuOpen(false)
  }

  const handleAddMenu = () => {
    setMenuOpen(false)
  }
  const taskLinks = [
    {to:"/todolist",label:"Agregar Tareas",icon: <IconAdd/>,click: handleTask},
    {to:"/tasklist",label:"Pendientes",icon: <IconPendiente/>,click: handleTask},
    {to:"/progresstasks",label:"En Proceso",icon: <IconProceso/>, click: handleTask},
    {to:"/",label:"Terminadas",icon: <IconFinish/>, click: handleTask},
  ]
  const tonersLinks = [
    {to:"/orders",label:"Pedido de toner",icon: <IconRequestToner/>,click: handleToners},
    {to:"/areas",label:"Gestion de Areas",icon: <IconAreaManegement/>,click: handleToners},
    {to:"/toners",label:"Stock",icon: <IconStock/>, click: handleToners},
    {to:"/restock",label:"Ingreso",icon: <IconIncome/>, click: handleToners},
    {to:"/stockideal",label:"Pedido Recomendado",icon: <IconRecommendedOrder/>, click: handleToners},
  ]

  const adminLinks = [
    {to:"/orders",label:"Pedido de Toner",icon: <IconRequestToner/>,click: handleAddMenu},
    {to:"/areas",label:"Gestion de Areas",icon: <IconAreaManegement/>,click: handleAddMenu},
    {to:"/stockideal",label:"Pedido Recomendado",icon: <IconRecommendedOrder/>, click: handleAddMenu},
    {to:"/tasklist",label:"Tareas pendientes",icon: <IconPendiente/>,click: handleTask},
    {to:"/mytasks",label:"Mis tareas",icon: <IconMyTasks/>,click: handleTask},
    {to:"/",label:"Salir",icon: <IconGetOut/>, click: handleLogout},
  ]

  const stockLinks = [
    {to:"/toners",label:"Stock",icon: <IconStock/>, click: handleToners},
    {to:"/restock",label:"Ingreso",icon: <IconIncome/>, click: handleToners},
  ]
  const superAdminLinks = [
    {to:"/adduser",label:"Agregar Usuarios",icon: <IconAddUser/>, click: handleAddMenu },
    {to:"/",label:"Salir",icon: <IconGetOut/>, click: handleLogout},
  ]
  const empleadoLinks = [
    {to:"/orders",label:"Solicitar Toners",icon: <IconRequestToner/>, click: handleAddMenu },
    {to:"/",label:"Salir",icon: <IconGetOut/>, click: handleLogout},
  ]


  const renderLinks = (links) => (
    links.map(link => (
      <Link
        to={link.to}
        className="text-white mb-4 border-black/40 flex justify-between text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
        onClick={link.click}
      >
        {link.label}
        {link.icon}
      </Link>
    ))
  );

  return (
    <nav className="bg-gray-600 w-full lg:w-64 flex flex-col p-4 lg:h-full">
      <div className="flex justify-between lg:justify-center items-center mb-10">
        <Link to="/" className="flex justify-center items-center">
          <img src={logoMuni} className="size-10 lg:size-20" alt="Logo" />
        </Link>
        <button
          className="lg:hidden block text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      {
        isAuthenticated ? (
          <>
            {user.role === "superadmin" && (
              <>
                <div className={`lg:flex flex-col ${menuOpen ? "block" : "hidden"}`}>

                  <div className="relative mb-4">
                    <button
                      className="rounded-lg text-white border-black/40 flex lg:justify-between justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300 w-full"
                      onClick={toggleDropdownTareas}
                    >
                      Tareas
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform ${dropdownOpenTareas ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}><path stroke="none" d="M0 0h24h24H0z" fill="none" /><path d="M6 9l6 6l6 -6" /></svg>
                    </button>
                    {dropdownOpenTareas && (
                      <div className="absolute left-full top-0 mt-2 w-48 bg-gray-600 text-white z-10">
                        {renderLinks(taskLinks)}
                      </div>
                    )}
                  </div>

                  <div className="relative mb-4">
                    <button
                      className="rounded-lg text-white border-black/40 flex lg:justify-between justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300 w-full"
                      onClick={toggleDropdown}
                    >
                      Toners
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}><path stroke="none" d="M0 0h24h24H0z" fill="none" /><path d="M6 9l6 6l6 -6" /></svg>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute left-full top-0 mt-2 w-48 bg-gray-600 text-white z-10">
                        
                        {renderLinks(tonersLinks)}
                      </div>
                    )}
                  </div>

                  {renderLinks(superAdminLinks)}
                </div>
              </>
            )}
            {user.role === 'admin' && (
              <div className={`lg:flex flex-col ${menuOpen ? "block" : "hidden"}`}>
                <div className="relative mb-4">
                <button
                  className="rounded-lg text-white border-black/40 flex lg:justify-between justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300 w-full"
                  onClick={toggleDropdown}
                >
                  Stock
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}><path stroke="none" d="M0 0h24h24H0z" fill="none" /><path d="M6 9l6 6l6 -6" /></svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute left-full top-0 mt-2 w-48 bg-gray-600 text-white z-10">
                    {renderLinks(stockLinks)}
                  </div>
                )}
              </div>
              {renderLinks(adminLinks)}
            </div>
            )}
            {user.role === 'empleado' && (
              <>
                <div className={`lg:flex flex-col ${menuOpen ? "block" : "hidden"}`}>
                {renderLinks(empleadoLinks)}
                </div>

              </>
            )}

          </>
        ) : (
          <>
          </>
        )}
    </nav>
  )
}

export default Dashborad