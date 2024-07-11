import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sideBar'; // Asegúrate de importar el componente Sidebar correctamente
import Modal from 'react-modal';
import { useUser } from '../../context/UserContext';
import { useNoteContext, Note } from '../../context/NoteContext';
import axios from 'axios';

Modal.setAppElement('#root'); // Set the root element for accessibility

const Inicio: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalColor, setModalColor] = useState<string>('text-green-600'); // Default color for success message
  const { user } = useUser(); // Obtener el usuario del contexto
  const {fetchNotes, addNote, updateNote, deleteNote } = useNoteContext(); // Obtener las funciones del contexto de notas

  useEffect(() => {
    if (user) {
      fetchNotes(user.id); // Fetch notes when the component mounts
    }
  }, [user]);

  const handleSaveNote = async () => {
    try {
      const noteData = {
        nombre: title,
        contenido: content,
        id_usuario: user?.id!,
        estado: 'Pendiente',
        fecha: new Date().toISOString().split('T')[0], 
      };

      if (!noteData.nombre) {
        setModalMessage('El título de la nota es obligatorio.');
        setModalColor('text-red-500');
        setIsModalOpen(true);
        return;
      }
      if (!noteData.contenido) {
        setModalMessage('El contenido de la nota es obligatorio.');
        setModalColor('text-red-500');
        setIsModalOpen(true);
        return;
      }

      if (editingNote) {
        await updateNote(editingNote.id_nota!, noteData);
        setModalMessage('Nota actualizada exitosamente');
      } else {
        await addNote(noteData);
        setModalMessage('Nota creada exitosamente');
      }
      setModalColor('text-green-600');
      setIsModalOpen(true);
      setTitle('');
      setContent('');
      setEditingNote(null);
    } catch (error) {
      setModalMessage(`Error al guardar la nota: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      setModalColor('text-red-500');
      setIsModalOpen(true);
    }
  };

  const handleEditNote = (note: Note) => {
    setTitle(note.nombre);
    setContent(note.contenido);
    setEditingNote(note);
    setSelectedNote(note);
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await deleteNote(id);
      setModalMessage('Nota eliminada exitosamente');
      setModalColor('text-green-600');
      setIsModalOpen(true);
      setTitle('');
      setContent('');
      setEditingNote(null);
      setSelectedNote(null);
    } catch (error) {
      setModalMessage(`Error al eliminar la nota: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      setModalColor('text-red-500');
      setIsModalOpen(true);
    }
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.nombre);
    setContent(note.contenido);
    setEditingNote(note);
  };

  const handleCompleteNotes = async (noteIds: number[]) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3000/api/notes/multiple', { noteIds, estado: 'Completada' }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModalMessage('Notas completadas exitosamente');
      setModalColor('text-green-600');
      setIsModalOpen(true);
      fetchNotes(user!.id);
    } catch (error) {
      setModalMessage(`Error al completar las notas: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      setModalColor('text-red-500');
      setIsModalOpen(true);
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <Sidebar
        onSelectNote={handleSelectNote}
        onEditNote={handleEditNote}
        onCompleteNotes={handleCompleteNotes}
      />
      <div className="min-h-screen bg-cover bg-center flex-1" style={{ backgroundImage: `url('')` }}>
        <div className="container mx-auto px-4 py-4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-yellow-300 text-2xl text-center mb-4">Crea o Edita tu Nota</h1>
            <div>
              <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full p-2 mb-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline hover:shadow-md"
              />
              <textarea
                placeholder="Contenido"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="block w-full p-2 mb-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline hover:shadow-md min-h-80"
              />
              <div className="flex justify-between">
                <button
                  onClick={handleSaveNote}
                  className="block w-full bg-gray-700 hover:bg-gray-500 text-white p-2 rounded"
                >
                  {editingNote ? 'Actualizar Nota' : 'Agregar Nota'}
                </button>
                {editingNote && (
                  <button
                    onClick={() => handleDeleteNote(editingNote.id_nota!)}
                    className="block w-full bg-gray-700 hover:bg-gray-500 text-white p-2 rounded ml-2"
                  >
                    Eliminar Nota
                  </button>
                )}
              </div>
            </div>
          </div>
          {selectedNote && (
            <div className="bg-white rounded-xl shadow-md p-6 mt-4">
              <h2 className="text-2xl font-bold">{selectedNote.nombre}</h2>
              <p>{selectedNote.contenido}</p>
              <p>{selectedNote.fecha?.toString()}</p>
              <p>{selectedNote.estado}</p>
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
