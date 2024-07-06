// src/components/Inicio.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/sideBar';
import Modal from 'react-modal';
import { useUser } from '../../context/UserContext'; // Importar el contexto del usuario

Modal.setAppElement('#root'); // Set the root element for accessibility

// Interfaz para definir la estructura de una nota
export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  estado: string;
}

const Inicio: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalColor, setModalColor] = useState<string>('text-green-600'); // Default color for success message
  const { user } = useUser(); // Obtener el usuario del contexto

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (user) {
      fetchNotes(user.id);
    }
  }, [user]);

  // Función para obtener las notas desde el servidor
  const fetchNotes = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/notes/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(response.data)) {
        setNotes(response.data); // Actualiza el estado con las notas obtenidas
      } else {
        setNotes([]); // Si no es un array, establece el estado como vacío
      }
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(`Error al obtener las notas: ${error.message}`);
      } else {
        setModalMessage('Error desconocido al obtener las notas.');
      }
      setModalColor('text-red-500'); // Set color to red for error message
      setIsModalOpen(true);
    }
  };

  // Función para manejar la creación o actualización de una nota
  const handleSaveNote = async () => {
    try {
      const noteData = {
        nombre: title,
        contenido: content,
        id_usuario: user?.id,
        estado: 'Pendiente',
        fecha: new Date().toISOString().split('T')[0]
      };

      if (!noteData.nombre) {
        setModalMessage('El título de la nota es obligatorio.');
        setModalColor('text-red-500'); // Set color to red for error message
        setIsModalOpen(true);
        return;
      }
      if (!noteData.contenido) {
        setModalMessage('El contenido de la nota es obligatorio.');
        setModalColor('text-red-500'); // Set color to red for error message
        setIsModalOpen(true);
        return;
      }

      if (editingNote) {
        // Si hay una nota en edición, actualiza la nota existente
        await axios.put(`http://localhost:3000/api/notes/${editingNote.id}`, noteData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setModalMessage('Nota actualizada exitosamente');
      } else {
        // Si no hay nota en edición, crea una nueva nota
        await axios.post('http://localhost:3000/api/notes', noteData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setModalMessage('Nota creada exitosamente');
      }
      setModalColor('text-green-600'); // Set color to green for success message
      setIsModalOpen(true);
      setTitle(''); // Limpia el campo de título
      setContent(''); // Limpia el campo de contenido
      setEditingNote(null); // Resetea el estado de edición
      if (user) fetchNotes(user.id); // Vuelve a cargar las notas
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(`Error al guardar la nota: ${error.message}`);
      } else {
        setModalMessage('Error desconocido al guardar la nota.');
      }
      setModalColor('text-red-500'); // Set color to red for error message
      setIsModalOpen(true);
    }
  };

  // Función para manejar la edición de una nota
  const handleEditNote = (note: Note) => {
    setTitle(note.title); // Establece el título de la nota en el formulario
    setContent(note.content); // Establece el contenido de la nota en el formulario
    setEditingNote(note); // Establece la nota en edición
  };

  // Función para manejar la eliminación de una nota
  const handleDeleteNote = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }); // Elimina la nota por su ID
      setModalMessage('Nota eliminada exitosamente');
      setModalColor('text-green-600'); // Set color to green for success message
      setIsModalOpen(true);
      if (user) fetchNotes(user.id); // Vuelve a cargar las notas
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(`Error al eliminar la nota: ${error.message}`);
      } else {
        setModalMessage('Error desconocido al eliminar la nota.');
      }
      setModalColor('text-red-500'); // Set color to red for error message
      setIsModalOpen(true);
    }
  };

  // Función para manejar la selección de una nota
  const handleSelectNote = (note: Note) => {
    setSelectedNote(note); // Establece la nota seleccionada
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <Sidebar notes={notes} onSelectNote={handleSelectNote} />
      <div className="min-h-screen bg-cover bg-center flex-1" style={{ backgroundImage: `url('')` }}>
        <div className="container mx-auto px-4 py-4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div>
              <h1 className="text-yellow-300 text-2xl text-center mb-4">Crea tu nueva Nota</h1>
              <div>
                <input
                  type="text"
                  placeholder="Título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full p-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline hover:shadow-md mb-2"
                />
                <textarea
                  placeholder="Contenido"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="block w-full p-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline hover:shadow-md mb-2 min-h-80"
                />
                <div className='flex justify-between'>
                  <button
                    onClick={handleSaveNote}
                    className="block w-full bg-gray-700 hover:bg-gray-500 text-white p-2 rounded w-1/2 mr-1"
                  >
                    {editingNote ? 'Actualizar Nota' : 'Agregar Nota'}
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="block w-full bg-gray-700 hover:bg-gray-500 text-white p-2 rounded w-1/2 mr-1"
                  >
                    {editingNote ? 'Actualizar Nota' : 'Borrar Nota'}
                  </button>
                </div>
              </div>
              <ul className="mt-4">
                {notes.map((note) => (
                  <li key={note.id} className="border-b py-2">
                    <h2 className="text-lg font-bold">{note.title}</h2>
                    <p>{note.content}</p>
                    <button
                      onClick={() => handleEditNote(note)}
                      className="text-blue-500 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-red-500"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {selectedNote && (
            <div className="bg-white rounded-xl shadow-md p-6 mt-4">
              <h2 className="text-2xl font-bold">{selectedNote.title}</h2>
              <p>{selectedNote.content}</p>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Mensaje de Nota"
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
};

export default Inicio;
