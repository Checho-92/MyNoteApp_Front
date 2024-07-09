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
      <nav  aria-label="Sidebar" className="lg:w-40 md:w-1/3 sm:w-full bg-white p-0 h-screen scroll-smooth overflow-y-auto">
        <div className="bg-white rounded-xl shadow-md p-6">
    <div className="text-yellow-300 text-2xl text-center ">
      <p className=''>Notas</p>
    </div>

        {notes.map((note) => (
          <a
            key={note.id_nota?.toString()}
            href="#"
            onClick={() => onSelectNote(note)}
            className="text-gray-800  hover:text-red-700"
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
