// src/pages/Register.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../adapters/context/UserContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpiar mensaje de error
    setSuccess(''); // Limpiar mensaje de éxito

    try {
      const response = await axios.post('http://localhost:3000/api/user/register', formData);
      
      // Mostrar mensaje de éxito
      setSuccess(response.data.message);

      // Almacenar el usuario en el contexto global y redirigir al inicio
      const user = {
        id: response.data.user.id,
        nombre: formData.firstName,
        apellido: formData.lastName
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      setTimeout(() => {
        navigate('/');
      }, 1000); // Redirige después de 1 segundo
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Error al registrar el usuario');
      } else {
        setError('Error al registrar el usuario');
      }
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('.)` }}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
          <h3 className="text-yellow-300 text-center mb-4 text-2xl">Regístrate</h3>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {success && <div className="text-green-500 text-center mb-4">{success}</div>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                  Nombre
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline hover:shadow-md"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                  Apellido
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline hover:shadow-md"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                Contraseña
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline hover:shadow-md"
                id="password"
                type="password"
                placeholder="**********"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="confirmPassword">
                Confirmar Contraseña
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline hover:shadow-md"
                id="confirmPassword"
                type="password"
                placeholder="**********"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button className="w-full px-4 py-2 font-bold text-white bg-gray-700 rounded-full hover:text-yellow-300 focus:outline-none focus:shadow-outline hover:shadow-md" type="submit">
              Registrar cuenta
            </button>
          </form>
          <hr className="border-t" />
          
          <div className="text-center">
            <Link to='/login' className="text-sm text-yellow-300 hover:text-gray-700">
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
