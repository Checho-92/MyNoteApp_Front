import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

// Interfaz para definir la estructura de una nota
export interface Note {
  id: number;
  title: string;
  content: string;
  date: Date;
  estado: string;
  nombre: string; // Añadimos el campo nombre
}

interface NoteContextType {
  notes: Note[];
  fetchNotes: (userId: number) => Promise<void>;
  addNote: (note: Omit<Note, 'id' | 'date'>) => Promise<void>;
  updateNote: (id: number, noteData: Partial<Note>) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async (userId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/api/notes/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data); // Guardar las notas en el estado local
    } catch (error) {
      console.error('Error al obtener las notas:', error);
    }
  };

  const addNote = async (note: Omit<Note, 'id' | 'date'>) => {
    try {
      const token = localStorage.getItem('token');
      const newNote = {
        ...note,
        id_usuario: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).id : null,
        estado: 'Pendiente',
        fecha: new Date().toISOString().split('T')[0],
      };
      const response = await axios.post('http://localhost:3000/api/notes', newNote, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes([...notes, response.data]); // Agregar la nueva nota al estado local
    } catch (error) {
      console.error('Error al agregar la nota:', error);
    }
  };

  const updateNote = async (id: number, noteData: Partial<Note>) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/notes/${id}`, noteData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedNotes = notes.map(note => (note.id === id ? { ...note, ...noteData } : note));
      setNotes(updatedNotes); // Actualizar la nota en el estado local
    } catch (error) {
      console.error('Error al actualizar la nota:', error);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedNotes = notes.filter(note => note.id !== id);
      setNotes(updatedNotes); // Eliminar la nota del estado local
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, fetchNotes, addNote, updateNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNoteContext must be used within a NoteProvider');
  }
  return context;
};
