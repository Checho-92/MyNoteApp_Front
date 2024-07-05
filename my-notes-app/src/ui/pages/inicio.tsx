// src/components/Inicio.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/sideBar';

// Interfaz para definir la estructura de una nota
export interface Note {
  id: string;
  title: string;
  content: string;
}

const Inicio: React.FC = () => {
  // Estado para almacenar las notas
  const [notes, setNotes] = useState<Note[]>([]);
  // Estado para almacenar el título de la nota en el formulario
  const [title, setTitle] = useState('');
  // Estado para almacenar el contenido de la nota en el formulario
  const [content, setContent] = useState('');
  // Estado para manejar la nota que se está editando
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  // Estado para manejar la nota seleccionada en la vista
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Hook useEffect para cargar las notas cuando el componente se monta
  useEffect(() => {
    fetchNotes();
  }, []);

  // Función para obtener las notas desde el servidor
  const fetchNotes = async () => {
    try {
      const response = await axios.get('/api/notes');
      if (Array.isArray(response.data)) {
        setNotes(response.data); // Actualiza el estado con las notas obtenidas
      } else {
        setNotes([]); // Si no es un array, establece el estado como vacío
      }
    } catch (error) {
      setNotes([]); // En caso de error, establece el estado como vacío
    }
  };

  // Función para manejar la creación o actualización de una nota
  const handleSaveNote = async () => {
    try {
      if (editingNote) {
        // Si hay una nota en edición, actualiza la nota existente
        await axios.put(`/api/notes/${editingNote.id}`, { title, content });
      } else {
        // Si no hay nota en edición, crea una nueva nota
        await axios.post('/api/notes', { title, content });
      }
      setTitle(''); // Limpia el campo de título
      setContent(''); // Limpia el campo de contenido
      setEditingNote(null); // Resetea el estado de edición
      fetchNotes(); // Vuelve a cargar las notas
    } catch (error) {
      // Manejo de errores (puede agregar lógica de manejo de errores aquí)
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
      await axios.delete(`/api/notes/${id}`); // Elimina la nota por su ID
      fetchNotes(); // Vuelve a cargar las notas
    } catch (error) {
      // Manejo de errores (puede agregar lógica de manejo de errores aquí)
    }
  };

  // Función para manejar la selección de una nota
  const handleSelectNote = (note: Note) => {
    setSelectedNote(note); // Establece la nota seleccionada
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
    </div>
  );
};

export default Inicio;
