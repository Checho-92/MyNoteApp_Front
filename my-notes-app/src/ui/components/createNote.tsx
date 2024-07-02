import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Note {
  id: string;
  title: string;
  content: string;
}

const CreateNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get('/api/notes');
    setNotes(response.data);
  };

  const handleSaveNote = async () => {
    if (editingNote) {
      await axios.put(`/api/notes/${editingNote.id}`, { title, content });
    } else {
      await axios.post('/api/notes', { title, content });
    }
    setTitle('');
    setContent('');
    setEditingNote(null);
    fetchNotes();
  };

  const handleEditNote = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNote(note);
  };

  const handleDeleteNote = async (id: string) => {
    await axios.delete(`/api/notes/${id}`);
    fetchNotes();
  };

  return (
    <div>
      <h1>Gestión de Notas</h1>
      <div>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleSaveNote}>
          {editingNote ? 'Actualizar Nota' : 'Agregar Nota'}
        </button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => handleEditNote(note)}>Editar</button>
            <button onClick={() => handleDeleteNote(note.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateNotes;
