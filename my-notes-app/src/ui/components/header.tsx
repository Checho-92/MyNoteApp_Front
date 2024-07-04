import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../adapters/context/UserContext'

const Header: React.FC = () => {
  const { user, logout } = useUser();

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl">MyNotesApp</span>
        </Link>
        <div className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {/* Aquí podrías añadir más elementos de navegación si lo deseas */}
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-900">Bienvenido, {user.nombre}</span>
              <button
                onClick={logout}
                className="bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-gray-700 text-white border-0 py-1 px-3 focus:outline-none hover:bg-yellow-300 rounded text-base mt-4 md:mt-0">
                  Inicia sesión
                </button>
              </Link>
              <Link to="/registro">
                <button className="bg-gray-700 text-white border-0 py-1 px-3 focus:outline-none hover:bg-yellow-300 rounded text-base mt-4 md:mt-0">
                  Registrate
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
