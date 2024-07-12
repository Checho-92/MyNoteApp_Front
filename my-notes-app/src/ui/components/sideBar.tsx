import React, { useEffect, useState } from 'react';
import { useNoteContext, Note } from '../../context/NoteContext'; // Importar el contexto de notas
import { useUser } from '../../context/UserContext'; // Importar el contexto del usuario

interface SidebarProps {
  onSelectNote: (note: Note) => void;
  onEditNote: (note: Note) => void;
  onCompleteNotes: (noteIds: number[]) => void;
  onDeleteNotes: (noteIds: number[]) => void; // Añadir prop para eliminar múltiples notas
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectNote, onCompleteNotes, onDeleteNotes }) => {
  const { user } = useUser(); // Obtener el usuario del contexto 
  const { notes, fetchNotes } = useNoteContext(); // Obtener notas y función para establecer notas del contexto de notas
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotes, setSelectedNotes] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filter, setFilter] = useState<string>(''); // Estado para el filtro

  useEffect(() => {
    if (user) {
      fetchNotes(user.id); // Obtener las notas del usuario actual
    }
  }, [user]); // Ejecutar efecto cuando el usuario cambie o cuando fetchNotes cambie

  const filteredNotes = notes.filter(note => {
    const matchesSearchTerm = note.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === '' || note.estado === filter;
    return matchesSearchTerm && matchesFilter;
  });

  const handleCheckboxChange = (noteId: number) => {
    setSelectedNotes(prevSelectedNotes =>
      prevSelectedNotes.includes(noteId)
        ? prevSelectedNotes.filter(id => id !== noteId)
        : [...prevSelectedNotes, noteId]
    );
  };

  const handleCompleteNotes = () => {
    if (selectedNotes.length === 0) {
      setErrorMessage('Debe seleccionar al menos una nota para completar.');
      return;
    }
    onCompleteNotes(selectedNotes);
    setSelectedNotes([]);
    setErrorMessage(''); // Limpiar el mensaje de error si las notas se completan correctamente
  };

  const handleDeleteNotes = () => {
    if (selectedNotes.length === 0) {
      setErrorMessage('Debe seleccionar al menos una nota para eliminar.');
      return;
    }
    onDeleteNotes(selectedNotes);
    setSelectedNotes([]);
    setErrorMessage(''); // Limpiar el mensaje de error si las notas se eliminan correctamente
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <nav aria-label="Sidebar" className="w-full lg:w-60 sx lg:h-full md:w-full sm:w-full bg-white p-0 h-full scroll-smooth overflow-y-auto">
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
          <p 
            className="cursor-pointer hover:text-gray-700"
            onClick={() => handleFilterChange('')}
          >
            Total: {notes.length}
          </p>
          <p 
            className="cursor-pointer hover:text-gray-700"
            onClick={() => handleFilterChange('Pendiente')}
          >
            Pendientes: {notes.filter(note => note.estado === 'Pendiente').length}
          </p>
          <p 
            className="cursor-pointer hover:text-gray-700"
            onClick={() => handleFilterChange('Completada')}
          >
            Completadas: {notes.filter(note => note.estado === 'Completada').length}
          </p>
        </div>
        {filteredNotes.map((note, index) => (
          <React.Fragment key={note.id_nota?.toString()}>
            <div className="flex items-center justify-between mb-4 mt-4">
              <a
                href="#"
                onClick={() => onSelectNote(note)}
                className="text-gray-800 hover:text-yellow-300 flex-1 flex items-start"
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
        {errorMessage && (
          <div className="text-red-500 text-center mb-2">
            {errorMessage}
          </div>
        )}
        <div className='grid justify-items-center'>
          <button onClick={handleCompleteNotes} className="mt-2 bg-gray-700 w-full hover:text-yellow-300 focus:outline-none focus:shadow-outline hover:shadow-md text-white p-2 rounded">
            Completar
          </button>
          <button onClick={handleDeleteNotes} className="mt-2 mr-0 bg-gray-700 w-full hover:text-red-500 focus:outline-none focus:shadow-outline hover:shadow-md text-white p-2 rounded">
            Eliminar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
