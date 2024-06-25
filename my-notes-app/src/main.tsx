import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AppRouter } from './routes/AppRouter';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotesDone from './pages/notesDone';
import NotesInProgress from './pages/notesInProgress';
import Register from './pages/register';
import { UserProvider } from './context/UserContext'
import Login from './pages/login';

const router = createBrowserRouter([
  
  {
    element: <AppRouter />,
    children: [
      {
        path: '/',
        element: <App/>,
      },
      {
        path: '/notesDone',
        element: <NotesDone/>,
      },
      {
        path: '/notesInProgress',
        element: <NotesInProgress/>,
      },
      {
        path: '/register',
        element: <Register/>,
      },
      {
        path: '/login',
        element: <Login/>,
      },
     
    ],
  },

])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <UserProvider>
     <RouterProvider router={router} />
     </UserProvider>
  </React.StrictMode>,
)
