import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppRouter } from './ui/routes/AppRouter';
import { UserProvider } from './adapters/context/UserContext';
import Register from '../src/ui/pages/register';
import Login from '../src/ui/pages/login';
import Inicio from './ui/pages/inicio';
import '../src/index.css'

const router = createBrowserRouter([
  {
    element: <AppRouter />,
    children: [
      {
        path: '/',
        element: <Inicio />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registro',
        element: <Register />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
);
