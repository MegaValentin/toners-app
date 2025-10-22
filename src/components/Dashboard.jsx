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
import IconHardware from "./Icons/IconHardaware";
import IconQuestion from "./Icons/IconQuestion";

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
    {to:"/mytasks",label:"Mis tareas",icon: <IconMyTasks/>,click: handleTask},
    {to:"/progresstasks",label:"En Proceso",icon: <IconProceso/>, click: handleTask},
    {to:"/completed",label:"Terminadas",icon: <IconFinish/>, click: handleTask},
  ]
  const tonersLinks = [
    {to:"/orders",label:"Pedido de toner",icon: <IconRequestToner/>,click: handleToners},
    {to:"/areas",label:"Gestion de Areas",icon: <IconAreaManegement/>,click: handleToners},
    {to:"/toners",label:"Stock",icon: <IconStock/>, click: handleToners},
    {to:"/restock",label:"Ingreso",icon: <IconIncome/>, click: handleToners},
    {to:"/stockideal",label:"Pedido Recomendado",icon: <IconRecommendedOrder/>, click: handleToners},
    {to:"/print",label:"Que toner usa",icon: <IconQuestion/>, click: handleToners},
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
    {to:"/hardware",label:"Orden de Compras",icon: <IconHardware/>, click: handleAddMenu },
    {to:"/adduser",label:"Agregar Usuarios",icon: <IconAddUser/>, click: handleAddMenu },
    {to:"/",label:"Salir",icon: <IconGetOut/>, click: handleLogout},
  ]
  const empleadoLinks = [
    {to:"/orders",label:"Solicitar Toners",icon: <IconRequestToner/>, click: handleAddMenu },
    {to:"/",label:"Salir",icon: <IconGetOut/>, click: handleLogout},
  ]


  const renderLinks = (links) =>
    links.map((link, index) => (
      <Link
        key={index}
        to={link.to}
        className="flex items-center text-white text-sm lg:text-base gap-x-2 py-2 px-4 hover:bg-gray-300"
        onClick={link.click}
      >
        {link.icon}
        {link.label}
      </Link>
    ));

  return (
    <nav className="bg-gray-600 w-full lg:w-64 flex flex-col p-4 lg:h-full">
    <div className="flex justify-between items-center mb-4 lg:mb-10">
      <Link to="/" className="flex justify-center items-center">
        <img src={logoMuni} className="h-10 lg:h-20" alt="Logo" />
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    {isAuthenticated && (
      <div className={`lg:flex flex-col ${menuOpen ? "block" : "hidden"}`}>
        {user.role === "superadmin" && (
          <>
            

            <div className="relative mb-4">
              <button
                className="flex justify-between items-center text-white py-2 px-4 w-full hover:bg-gray-700"
                onClick={toggleDropdown}
              >
                Toners
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="pl-4 text-white bg-gray-700">{renderLinks(tonersLinks)}</div>
              )}
            </div>
            <div className="relative mb-4">
              <button
                className="flex justify-between items-center text-white py-2 px-4 w-full hover:bg-gray-700"
                onClick={toggleDropdownTareas}
              >
                Tareas
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${
                    dropdownOpenTareas ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {dropdownOpenTareas && (
                <div className="pl-4 text-white bg-gray-700">{renderLinks(taskLinks)}</div>
              )}
            </div>

            {renderLinks(superAdminLinks)}

            
          </>
        )}

        {user.role === "admin" && (
          <div className="relative mb-4">
            <button
              className="flex justify-between items-center text-white py-2 px-4 w-full hover:bg-gray-700"
              onClick={toggleDropdown}
            >
              Stock
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="pl-4 text-white bg-gray-700">{renderLinks(stockLinks)}</div>
            )}
            {renderLinks(adminLinks)}
          </div>
        )}

        {user.role === "empleado" && <div>{renderLinks(empleadoLinks)}</div>}
      </div>
    )}
  </nav>
  )
}

export default Dashborad