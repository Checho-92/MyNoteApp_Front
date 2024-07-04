// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { Note } from '../pages/inicio'; // Asegúrate de exportar la interfaz Note desde Inicio

interface SidebarProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ notes, onSelectNote }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
        <div className="w-1/5 bg-white text-yellow-300 p-4 min-h-screen">
                <h2 className="text-2xl  font-semibold mb-6 mt-4">Notas</h2>
                <input
                    type="text"
                    placeholder="Buscar notas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                />
                <ul className='min-h-80'>
                    {filteredNotes.map(note => (
                    <li
                        key={note.id}
                        onClick={() => onSelectNote(note)}
                        className="cursor-pointer mb-2 hover:bg-gray-700 p-2 rounded"
                    >
                        {note.title}
                    </li>
                    ))}
            </ul>
        </div>
    
  );
};

export default Sidebar;
