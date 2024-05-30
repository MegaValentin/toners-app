import { Routes, Route, Router, Link } from "react-router-dom";
import Modal from "react-modal";
import Home from "./pages/Home.jsx";
import React, { useState } from "react";
import Toners from "./pages/Toners.jsx";
import Orders from "./pages/Orders.jsx";
import Areas from "./pages/Areas.jsx";
import logoMuni from "./assets/logoMuni.svg";
function App() {
  
  return (
    
      <div className="flex h-screen">
        <nav className="bg-gray-600 w-64 flex flex-col p-4">
          <Link to="/" className="flex justify-center items-center mb-10">
            <img src={logoMuni} className="size-20" alt="" />
          </Link>
          <Link
            to="/orders"
            className="rounded-lg text-white mb-4 border-black/40 flex justify-center text-xs lg:text-base gap-x-2 py-1 px-2  lg:py-2 md:px-4 hover:bg-gray-300"
          >
            Solicitar Toner
          </Link>
          <Link
            to="/toners"
            className="rounded-lg text-white mb-4 border-black/40 flex justify-center text-xs lg:text-base gap-x-2 py-1 px-2  lg:py-2 md:px-4 hover:bg-gray-300"
          >
            Stock de Toners
          </Link>
          <Link
            to="/areas"
            className="rounded-lg text-white mb-4 border-black/40 flex justify-center text-xs lg:text-base gap-x-2 py-1 px-2  lg:py-2 md:px-4 hover:bg-gray-300"
          >
            Gestion de Areas
          </Link>
        </nav>
        <div className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/toners" element={<Toners />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/areas" element={<Areas />} />
          </Routes>
        </div>
        
      </div>
     
    
  );
}

export default App;
