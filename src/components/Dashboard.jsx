import { Link } from "react-router-dom"
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"
import logoMuni from "../assets/logoMuni.svg";

const Dashborad = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <nav className="bg-gray-600 w-full lg:w-64 flex flex-col p-4 lg:h-full">
      <div className="flex justify-between items-center mb-10">
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
            {user.role === 'admin' && (
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
                to="/areas"
                className="rounded-lg text-white mb-4 border-black/40 flex justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                Gestión de Áreas
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-users-group"><path stroke="none" d="M0 0h24h24H0z" fill="none" /><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
              </Link>
              <Link
                to="/toners"
                className="rounded-lg text-white mb-4 border-black/40 flex justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                Stock de Toners
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-packages"><path stroke="none" d="M0 0h24h24H0z" fill="none" /><path d="M7 16.5l-5 -3l5 -3l5 3v5.5l-5 3z" /><path d="M2 13.5v5.5l5 3" /><path d="M7 16.545l5 -3.03" /><path d="M17 16.5l-5 -3l5 -3l5 3v5.5l-5 3z" /><path d="M12 19l5 3" /><path d="M17 16.5l5 -3" /><path d="M12 13.5v-5.5l-5 -3l5 -3l5 3v5.5" /><path d="M7 5.03v5.455" /></svg>
              </Link>
              <Link
                to="/stockideal"
                className="rounded-lg text-white mb-4 border-black/40 flex justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                Pedido Recomendado
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file-invoice"><path stroke="none" d="M0 0h24h24H0z" fill="none" /><path d="M9 14v-2a2 2 0 1 1 4 0v2a2 2 0 1 1 -4 0z" /><path d="M8 4h11a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-11a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2z" /><path d="M8 12h10" /><path d="M8 8h10" /><path d="M9 18h2" /></svg>
              </Link>
              <Link
                to="/restock"
                className="rounded-lg text-white mb-4 border-black/40 flex justify-center text-xs lg:text-base gap-x-2 py-1 px-2 lg:py-2 md:px-4 hover:bg-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                Restock de Toners
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-table-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" /><path d="M3 10h18" /><path d="M10 3v18" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
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