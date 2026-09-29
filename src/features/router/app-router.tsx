import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import LocaleLayout from './layouts/locale-layout/locale-layout';
import MainLayout from './layouts/main-layout/main-layout';
import AuthLayout from './layouts/auth-layout/auth-layout';
import KycPage from '@/app/auth-pages/kyc-page';

const Home = lazy(() => import('@/app/main-pages/home'));
const About = lazy(() => import('@/app/main-pages/about'));
const Classes = lazy(() => import('@/app/main-pages/classes'));
const Healthy = lazy(() => import('@/app/main-pages/healthy'));

const Login = lazy(() => import('@/app/auth-pages/login'));
const Register = lazy(() => import('@/app/auth-pages/register'));
const ForgotPassword = lazy(() => import('@/app/auth-pages/forgot-password'));

const NotFound = lazy(() => import('@/app/not-found'));

const withSuspense = (element: React.ReactNode) => <Suspense fallback={null}>{element}</Suspense>;

const SUPPORTED_LOCALES = ['en', 'ar'];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={`/${SUPPORTED_LOCALES[0]}`} replace />,
  },

  {
    path: '/:locale',
    element: <LocaleLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: withSuspense(<Home />) },
          { path: 'about', element: withSuspense(<About />) },
          { path: 'classes', element: withSuspense(<Classes />) },
          { path: 'healthy', element: withSuspense(<Healthy />) },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'forgot-password', element: <ForgotPassword /> },
          { path: 'kyc-page', element: <KycPage /> },
        ],
      },
      { path: '*', element: withSuspense(<NotFound />) },
    ],
  },

  { path: '*', element: <Navigate to={`/${SUPPORTED_LOCALES[0]}`} replace /> },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
