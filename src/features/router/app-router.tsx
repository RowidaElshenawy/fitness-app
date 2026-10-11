import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import LocaleLayout from './layouts/locale-layout/locale-layout';
import MainLayout from './layouts/main-layout/main-layout';
import AuthLayout from './layouts/auth-layout/auth-layout';

const Home = lazy(() => import('@/app/main-pages/home'));
const About = lazy(() => import('@/app/main-pages/about'));
const Classes = lazy(() => import('@/app/main-pages/classes'));
const Healthy = lazy(() => import('@/app/main-pages/healthy'));
const HealthyDetails = lazy(() => import('@/app/main-pages/healthy-details'));
const Profile = lazy(() => import('@/app/main-pages/profile'));

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
          { path: 'healthy/:mealId', element: withSuspense(<HealthyDetails />) },
          { path: 'profile', element: withSuspense(<Profile />) },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: withSuspense(<Login />) },
          { path: 'register', element: withSuspense(<Register />) },
          { path: 'forgot-password', element: withSuspense(<ForgotPassword />) },
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
