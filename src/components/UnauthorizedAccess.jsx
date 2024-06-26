import React from "react";

const UnauthorizedAcess = () => (

    <div className="flex flex-col items-center justify-center  bg-white p-6 shadow-md">
      <h1 className="text-2xl md:text-4xl font-bold text-red-600 mb-4 ">
        Usuario no autorizado
      </h1>
      <div className="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-ban text-red-600"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M5.7 5.7l12.6 12.6" />
        </svg>
      </div>
    </div>
    

)



export default UnauthorizedAcess