import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotesInProgress: React.FC = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedNote, setUpdatedNote] = useState({ nombre: '', fecha: '', contenido: '' });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/notes/inprocess', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setNotes(response.data);
      } catch (error) {
        console.error('Error al obtener las notas en proceso:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleEdit = (note) => {
    setSelectedNote(note);
    setUpdatedNote(note);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNotes(notes.filter(note => note.id_nota !== id));
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/api/notes/${selectedNote.id_nota}`, updatedNote, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNotes(notes.map(note => (note.id_nota === selectedNote.id_nota ? updatedNote : note)));
      setModalVisible(false);
    } catch (error) {
      console.error('Error al actualizar la nota:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedNote({
      ...updatedNote,
      [name]: value,
    });
  };

  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-600 font-semibold">Listado de Notas en Proceso</h2>
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nombre usuario
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nombre nota
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Creada el
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note) => (
                  <tr key={note.id_nota}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{note.id_nota}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{localStorage.getItem('userName')}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{note.nombre}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{note.fecha}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">{note.estado}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => handleEdit(note)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 ml-4"
                        onClick={() => handleDelete(note.id_nota)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96 relative">
            <h2 className="text-2xl mb-4">Editar Nota</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="nombre">
                Nombre Nota
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={updatedNote.nombre}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="fecha">
                Fecha
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={updatedNote.fecha}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="contenido">
                Contenido
              </label>
              <textarea
                id="contenido"
                name="contenido"
                value={updatedNote.contenido}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline h-32 resize-none"
              ></textarea>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSave}
            >
              Guardar
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => setModalVisible(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesInProgress;
