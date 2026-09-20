import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LocaleLayout from './layouts/locale-layout/locale-layout';
import MainLayout from './layouts/main-layout/main-layout';
import AuthLayout from './layouts/auth-layout/auth-layout';

import Home from '@/app/main-pages/home';
import About from '@/app/main-pages/about';
import Classes from '@/app/main-pages/classes';
import Healthy from '@/app/main-pages/healthy';

import Login from '@/app/auth-pages/login';
import Register from '@/app/auth-pages/register';
import ForgotPassword from '@/app/auth-pages/forgot-password';

const router = createBrowserRouter([
  {
    path: '/:locale',
    element: <LocaleLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'about', element: <About /> },
          { path: 'classes', element: <Classes /> },
          { path: 'healthy', element: <Healthy /> },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'forgot-password', element: <ForgotPassword /> },
        ],
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
