import React, { useState } from 'react';

const CreateNotes: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false); // Controla la visibilidad de la modal
  const [note, setNote] = useState({ name: '', date: '', content: '' }); // Para manejar el estado de la nota
  const [error, setError] = useState(''); // Para manejar mensajes de error
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simula el estado de autenticación

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
    if (isAuthenticated) {
      setModalVisible(true);
    } else {
      setError('Debes registrarte para poder agregar notas.');
    }
  };

  // Actualiza el estado de la nota y cierra la modal cuando se selecciona una opción
  const handleStatusChange = (status: string) => {
    console.log(`Nota marcada como: ${status}`);
    setModalVisible(false);
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
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Nombre nota</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={note.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="date" className="leading-7 text-sm text-gray-600">Fecha</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={note.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="content" className="leading-7 text-sm text-gray-600">Contenido</label>
                <textarea
                  id="content"
                  name="content"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  value={note.content}
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
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96 relative">
            <h2 className="text-2xl mb-4">Confirmar Nota</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h3 className="text-xl font-semibold mb-2">{note.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{note.date}</p>
              <p className="text-base">{note.content}</p>
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
