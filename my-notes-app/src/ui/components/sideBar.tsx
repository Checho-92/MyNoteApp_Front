import React, { useEffect, useState } from 'react';
import { useNoteContext, Note } from '../../context/NoteContext'; // Importar el contexto de notas
import { useUser } from '../../context/UserContext'; // Importar el contexto del usuario

interface SidebarProps {
  onSelectNote: (note: Note) => void;
  onEditNote: (note: Note) => void;
  onCompleteNotes: (noteIds: number[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectNote, onCompleteNotes }) => {
  const { user } = useUser(); // Obtener el usuario del contexto 
  const { notes, fetchNotes } = useNoteContext(); // Obtener notas y función para establecer notas del contexto de notas
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotes, setSelectedNotes] = useState<number[]>([]);

  useEffect(() => {
    if (user) {
      fetchNotes(user.id); // Obtener las notas del usuario actual
    }
  }, [user]); // Ejecutar efecto cuando el usuario cambie o cuando fetchNotes cambie

  const filteredNotes = notes.filter(note =>
    note.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (noteId: number) => {
    setSelectedNotes(prevSelectedNotes =>
      prevSelectedNotes.includes(noteId)
        ? prevSelectedNotes.filter(id => id !== noteId)
        : [...prevSelectedNotes, noteId]
    );
  };

  const handleCompleteNotes = () => {
    onCompleteNotes(selectedNotes);
    setSelectedNotes([]);
  };

  return (
    <nav aria-label="Sidebar" className="lg:w-60 md:w-1/3 sm:w-full bg-white p-0 h-full scroll-smooth overflow-y-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-yellow-300 text-2xl text-center">
          <p className=''>Notas</p>
        </div>
        <input
          type="text"
          placeholder="Buscar notas"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-2 mb-2 border rounded"
        />
        <div className="text-center mb-2">
          <p>Total: {notes.length}</p>
          <p>Pendientes: {notes.filter(note => note.estado === 'Pendiente').length}</p>
          <p>Completadas: {notes.filter(note => note.estado === 'Completada').length}</p>
        </div>
        {filteredNotes.map((note, index) => (
          <React.Fragment key={note.id_nota?.toString()}>
            <div className="flex items-center  justify-between mb-4 mt-4">
              <a
                href="#"
                onClick={() => onSelectNote(note)}
                className="text-gray-800 hover:text-red-700 flex-1 flex items-start"
              >
                
                <div className="ml-2 text-start text-xs font-normal">{note.nombre}</div>
              </a>
              <input
                type="checkbox"
                checked={selectedNotes.includes(note.id_nota!)}
                onChange={() => handleCheckboxChange(note.id_nota!)}
                className="ml-2"
              />
            </div>
            {index < filteredNotes.length - 1 && (
              <hr className="border-t border-gray-200 my-2" />
            )}
          </React.Fragment>
        ))}
        <button onClick={handleCompleteNotes} className="mt-4 bg-gray-700 text-white p-2 rounded">
          Completar seleccionadas
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
