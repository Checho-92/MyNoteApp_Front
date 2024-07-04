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
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('/api/notes');
      if (Array.isArray(response.data)) {
        setNotes(response.data);
      } else {
        setNotes([]);
      }
    } catch (error) {
      setNotes([]);
    }
  };

  const handleSaveNote = async () => {
    try {
      if (editingNote) {
        await axios.put(`/api/notes/${editingNote.id}`, { title, content });
      } else {
        await axios.post('/api/notes', { title, content });
      }
      setTitle('');
      setContent('');
      setEditingNote(null);
      fetchNotes();
    } catch (error) {}
  };

  const handleEditNote = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNote(note);
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      fetchNotes();
    } catch (error) {}
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
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
