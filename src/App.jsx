import React, { useState } from "react";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";

import Dashborad from "./components/Dashboard.jsx"
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Toners from "./pages/Toners.jsx";
import Orders from "./pages/Orders.jsx";
import Areas from "./pages/Areas.jsx";
import AddUserPage from "./pages/AddUserPage.jsx";
import ReStock from "./pages/ReStock.jsx";
import StockIdeal from "./pages/StockIdeal.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import TaksList from "./pages/TaskList.jsx";
import ToDoList from "./pages/ToDoList.jsx";
import InProgressTaskList from "./pages/InProgressTaksList.jsx";
import MyTasks from "./pages/MyTasks.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

//console.log(Home, Toners, Orders, Areas, ReStock, StockIdeal, LoginPage, ProtectedRoutes, ErrorBoundary);

function App() {
  

  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary>
          
            <div className="flex flex-col h-screen">

            <div className="flex flex-col lg:flex-row flex-grow">
              <Dashborad />
              <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/toners" element={<Toners />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/areas" element={<Areas />} />
                    <Route path="/restock" element={<ReStock />} />
                    <Route path="/stockideal" element={<StockIdeal />} />
                    <Route path="/adduser" element={<AddUserPage />} />
                    <Route path="/todolist" element={<ToDoList/>} />
                    <Route path="/tasklist" element={<TaksList/>}/>
                    <Route path="/progresstasks" element={<InProgressTaskList/>}/>
                    <Route path="/mytasks" element={<MyTasks/>}/>

                  </Route>
                </Routes>
              </div>
            </div>
            <Footer/>
            </div>
            

          
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
