import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../adapters/context/UserContext';

const Login: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setSuccessMessage('Inicio de sesión exitoso');

        setUser(data.user);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setErrorMessage('Credenciales incorrectas');
      }
    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('')` }}>
      <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-yellow-300 text-2xl text-center mb-4">Login</h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <label htmlFor="nombre" className="block mb-2 text-sm font-bold text-gray-700">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline hover:shadow-md"
            placeholder="Enter your name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline hover:shadow-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between mb-3">
            <label htmlFor="remember" className="flex items-center">
              <input type="checkbox" id="remember" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline hover:shadow-md" />
              <span className="ml-2 text-gray-700">Recuérdame</span>
            </label>
            <a href="#" className="text-sm text-gray-700 hover:text-yellow-300">¿Olvidaste tu contraseña?</a>
          </div>

          <button className="w-full px-4 py-2 font-bold text-white bg-gray-700 rounded-full hover:text-yellow-300 focus:outline-none focus:shadow-outline hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Login</span>
          </button>
        </form>

        {successMessage && <p className="text-center text-green-600">{successMessage}</p>}
        {errorMessage && <p className="text-center text-red-600">{errorMessage}</p>}

        <p className="text-sm text-yellow-300 hover:text-gray-700 text-center">
          ¿No tienes una cuenta?{' '}
          <Link to='/registro' className="text-sm text-yellow-300 hover:text-gray-700">
            Regístrate ahora
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
