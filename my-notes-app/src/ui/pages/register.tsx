import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalColor, setModalColor] = useState<string>('text-yellow-300'); // Default color for success message
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
    setModalMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/register', formData);
      
      // Mostrar mensaje de éxito
      setModalMessage(response.data.message);
      setModalColor('text-yellow-300'); // Set color to green for success message
      setIsModalOpen(true);

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
        setModalMessage(err.response?.data?.message || 'Error al registrar el usuario');
      } else {
        setModalMessage('Error al registrar el usuario');
      }
      setModalColor('text-red-500'); // Set color to red for error message
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('.)` }}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
          <h3 className="text-yellow-300 text-center mb-4 text-2xl">Regístrate</h3>
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Registro de Usuario"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl mb-4 text-gray-700">Mensaje</h2>
          <p className={modalColor}>{modalMessage}</p>
          <button onClick={closeModal} className="mt-4 bg-gray-700 text-white px-4 py-2 rounded">
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Register;
