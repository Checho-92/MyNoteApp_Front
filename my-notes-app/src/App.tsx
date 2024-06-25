import React from 'react';
import './index.css';
import CreateNotes from './components/createNote';
import NotesButton from './components/notesButton';

const App: React.FC = () => {
  return (
    <div className="App">
     
      <CreateNotes />
      <NotesButton />

    </div>
  );
}

export default App;
