import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateNotes: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false); // Controla la visibilidad de la modal
  const [note, setNote] = useState({ nombre: '', fecha: '', contenido: '' }); // Para manejar el estado de la nota
  const [error, setError] = useState(''); // Para manejar mensajes de error
  const [success, setSuccess] = useState(''); // Para manejar mensajes de éxito
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Estado de autenticación, por defecto asumimos que está autenticado

  useEffect(() => {
    // Reemplaza esto con la lógica real para verificar la autenticación
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/checkAuth', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Maneja el cambio en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  // Muestra la modal cuando se hace clic en "Agregar Nota"
  const handleAddNote = () => {
    setModalVisible(true);
  };

  // Maneja el envío de la nota al backend
  const handleStatusChange = async (status: string) => {
    try {
      const response = await axios.post('http://localhost:3000/api/notes', {
        ...note,
        estado: status,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Nota agregada:', response.data);
      setModalVisible(false);
      // Mostrar mensaje de éxito
      setSuccess('Nota agregada exitosamente');
      // Limpiar el mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(''), 3000);
      // Limpiar el formulario después de agregar la nota
      setNote({ nombre: '', fecha: '', contenido: '' });
    } catch (error) {
      console.error('Error al agregar la nota:', error);
      setError('Ocurrió un error al agregar la nota.');
    }
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Gestiona tus notas</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Agrega una nota solo llenando los campos requeridos y agregando un texto en el recuadro.
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="nombre" className="leading-7 text-sm text-gray-600">Nombre nota</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={note.nombre}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="fecha" className="leading-7 text-sm text-gray-600">Fecha</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={note.fecha}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="contenido" className="leading-7 text-sm text-gray-600">Contenido</label>
                <textarea
                  id="contenido"
                  name="contenido"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  value={note.contenido}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={handleAddNote}
              >
                Agregar Nota
              </button>
            </div>
            {error && (
              <div className="p-2 w-full text-center text-red-500">
                {error}
              </div>
            )}
            {success && (
              <div className="p-2 w-full text-center text-green-500">
                {success}
              </div>
            )}
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96 relative">
            <h2 className="text-2xl mb-4">Confirmar Nota</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h3 className="text-xl font-semibold mb-2">{note.nombre}</h3>
              <p className="text-sm text-gray-600 mb-2">{note.fecha}</p>
              <p className="text-base">{note.contenido}</p>
            </div>
            <p className="mb-4 text-center text-gray-600">¿Cómo deseas marcar esta nota?</p>
            <div className="flex justify-around">
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                onClick={() => handleStatusChange('Terminada')}
              >
                Terminada
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                onClick={() => handleStatusChange('En proceso')}
              >
                En proceso
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreateNotes;
