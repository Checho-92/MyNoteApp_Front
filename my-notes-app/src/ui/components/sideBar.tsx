import React, { useEffect } from 'react';
import { useNoteContext, Note } from '../../context/NoteContext'; // Importar el contexto de notas
import { useUser } from '../../context/UserContext'; // Importar el contexto del usuario

interface SidebarProps {
  onSelectNote: (note: Note) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectNote }) => {
  const { user } = useUser(); // Obtener el usuario del contexto 
  console.log(user)
  const { notes, fetchNotes } = useNoteContext(); // Obtener notas y función para establecer notas del contexto de notas

  useEffect(() => {
    if (user) {
      fetchNotes(user.id); // Obtener las notas del usuario actual
     
    }
  }, [user]); // Ejecutar efecto cuando el usuario cambie o cuando fetchNotes cambie

  return (
    <nav aria-label="Sidebar" className="hidden lg:block flex-shrink-0 bg-gray-800 overflow-y-auto">
      <div className="relative w-40 flex space-y-16 flex-col p-3">
        {notes.map((note) => (
          <a
            key={note.id_nota?.toString()}
            href="#"
            onClick={() => onSelectNote(note)}
            className="text-white hover:text-red-700"
          >
            <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
              <i className="fa fa-sticky-note"></i>
            </div>
            <div className="text-center text-xs font-normal">{note.nombre}</div>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
