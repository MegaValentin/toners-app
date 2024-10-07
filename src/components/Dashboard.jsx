import { Link } from "react-router-dom"
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"
import logoMuni from "../assets/logoMuni.svg";
import MenuAdmin from "./MenuAdmin";

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
                        <Link
                          to="/todolist"
                          className=" text-white mb-4 border-black/40 flex lg:justify-between justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                          onClick={() => { setMenuOpen(false); setDropdownOpenTareas(false); }}
                        >
                          Agregar Tareas
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
                        </Link>
                        <Link
                          to="/"
                          className=" text-white mb-4 border-black/40 flex lg:justify-between justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                          onClick={() => setMenuOpen(false)}
                        >
                          Pendientes
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-player-play"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 4v16l13 -8z" /></svg>
                        </Link>
                        <Link
                          to="/"
                          className=" text-white mb-4 border-black/40 flex lg:justify-between justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                          onClick={() => setMenuOpen(false)}
                        >
                          En Proceso
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-timeline"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 16l6 -7l5 5l5 -6" /><path d="M15 14m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M10 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M4 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M20 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                        </Link>
                        <Link
                          to="/"
                          className=" text-white mb-4 border-black/40 flex lg:justify-between justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                          onClick={() => setMenuOpen(false)}
                        >
                          Terminadas
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-zoom-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /><path d="M7 10l2 2l4 -4" /></svg>
                        </Link>
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
                        <Link
                          to="/orders"
                          className=" text-white mb-4 border-black/40 flex lg:justify-between justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                          onClick={() => setMenuOpen(false)}
                        >
                          Solicitar Toner
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-send-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" /><path d="M6.5 12h14.5" /></svg>
                        </Link>
                        <Link
                          to="/areas"
                          className=" text-white mb-4 border-black/40 flex lg:justify-between justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                          onClick={() => setMenuOpen(false)}
                        >
                          Gestión de Áreas
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-users-group"><path stroke="none" d="M0 0h24h24H0z" fill="none" /><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
                        </Link>
                        <Link
                          to="/toners"
                          className=" text-white mb-4 border-black/40 flex lg:justify-between justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                          onClick={() => { setMenuOpen(false); setDropdownOpen(false); }}
                        >
                          Stock
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-packages"><path stroke="none" d="M0 0h24h24H0z" fill="none" /><path d="M7 16.5l-5 -3l5 -3l5 3v5.5l-5 3z" /><path d="M2 13.5v5.5l5 3" /><path d="M7 16.545l5 -3.03" /><path d="M17 16.5l-5 -3l5 -3l5 3v5.5l-5 3z" /><path d="M12 19l5 3" /><path d="M17 16.5l5 -3" /><path d="M12 13.5v-5.5l-5 -3l5 -3l5 3v5.5" /><path d="M7 5.03v5.455" /></svg>
                        </Link>
                        <Link
                          to="/restock"
                          className=" text-white mb-4 border-black/40 flex lg:justify-between justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                          onClick={() => setMenuOpen(false)}
                        >
                          Ingreso
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-table-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" /><path d="M3 10h18" /><path d="M10 3v18" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
                        </Link>
                        <Link
                          to="/stockideal"
                          className=" text-white mb-4 border-black/40 flex lg:justify-between justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                          onClick={() => setMenuOpen(false)}
                        >
                          Pedido Recomendado
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file-invoice"><path stroke="none" d="M0 0h24h24H0z" fill="none" /><path d="M9 14v-2a2 2 0 1 1 4 0v2a2 2 0 1 1 -4 0z" /><path d="M8 4h11a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-11a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2z" /><path d="M8 12h10" /><path d="M8 8h10" /><path d="M9 18h2" /></svg>
                        </Link>

                      </div>
                    )}
                  </div>

                  <Link
                    to="/adduser"
                    className="rounded-lg text-white mb-4 border-black/40 flex lg:justify-between justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    Agregar Usuario
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
                  </Link>
                  <Link
                    to="/"
                    className="rounded-lg text-white mb-4 border-black/40 flex lg:justify-between justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                    onClick={() => { logout(), setMenuOpen(false) }}
                  >
                    Salir
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-door-exit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13 12v.01" /><path d="M3 21h18" /><path d="M5 21v-16a2 2 0 0 1 2 -2h7.5m2.5 10.5v7.5" /><path d="M14 7h7m-3 -3l3 3l-3 3" /></svg>
                  </Link>
                </div>
              </>
            )}
            {user.role === 'admin' && (
              <MenuAdmin/>
            )}
            {user.role === 'empleado' && (
              <>
                <div className={`lg:flex flex-col ${menuOpen ? "block" : "hidden"}`}>
                  <Link
                    to="/orders"
                    className="rounded-lg text-white mb-4 border-black/40 flex justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    Solicitar Toner
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-send-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" /><path d="M6.5 12h14.5" /></svg>
                  </Link>
                  <Link
                    to="/"
                    className="rounded-lg text-white mb-4 border-black/40 flex justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                    onClick={() => { logout(), setMenuOpen(false) }}
                  >
                    Salir
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-door-exit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13 12v.01" /><path d="M3 21h18" /><path d="M5 21v-16a2 2 0 0 1 2 -2h7.5m2.5 10.5v7.5" /><path d="M14 7h7m-3 -3l3 3l-3 3" /></svg>
                  </Link>
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