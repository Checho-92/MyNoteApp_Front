import React from 'react';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import App from '../../App';
import Register from '../pages/register';
import Login from '../pages/login';
import Header from '../components/header';
import Footer from '../components/footer';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
     
    ],
  },
];

const router = createBrowserRouter(routes);

const AppRouter: React.FC = () => {
  return (
    <div>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
};

export { AppRouter, router };
