//register.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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
        name: formData.firstName,
        correo: formData.email,
        password: formData.password
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
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('./public/img/fondo_inicio.jpg')` }}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl text-center mb-4">Regístrate</h3>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {success && <div className="text-green-500 text-center mb-4">{success}</div>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                  Nombres
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                  Apellidos
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
          
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                Contraseña
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="**********"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
              Registrar cuenta
            </button>
          </form>
          <hr className="border-t" />
          <div className="text-center">
            <a className="text-sm text-blue-500 hover:text-blue-800" href="#">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="text-center">
            <Link to='/login' className="text-sm text-blue-500 hover:text-blue-800">
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
