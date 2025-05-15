import { createBrowserRouter } from 'react-router';
import { AuthLayout } from '@/app/layouts/AuthLayouts';
import { ErrorLayout } from '@/app/layouts/ErrorLayout';
import { MainLayout } from '@/app/layouts/MainLayout';
import { ROUTES } from '@/app/routes';
import { HomePage } from '@/pages/HomePage/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { RegistrationPage } from '@/pages/RegistrationPage';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTRATION,
        element: <RegistrationPage />,
      },
    ],
  },
  {
    element: <ErrorLayout />,
    children: [
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
]);
