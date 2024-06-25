import React from 'react';
// import { useSelector } from 'react-redux'; // Importamos useSelector para acceder al estado de la aplicación

const Header: React.FC = () => {
  // const user = useSelector((state: any) => state.user); // Accedemos al estado del usuario

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl">MyNotesApp</span>
        </a>
        <div className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {/* Aquí podrías añadir más elementos de navegación si lo deseas */}
        </div>
        <div className="flex items-center space-x-4">
        
          <button className="bg-indigo-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">
            Inicio de sesión
          </button>
          <button className="bg-green-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-green-600 rounded text-base mt-4 md:mt-0">
            Registrarse
          </button>
          <button className="bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Opciones
         
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
