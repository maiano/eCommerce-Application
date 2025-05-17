import {
  createBrowserRouter,
  Navigate,
  Outlet
} from 'react-router-dom';
import { AuthLayout } from '@/app/layouts/AuthLayouts';
import { ErrorLayout } from '@/app/layouts/ErrorLayout';
import { MainLayout } from '@/app/layouts/MainLayout';
import { ROUTES } from '@/app/routes';
import { HomePage } from '@/pages/HomePage/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { useAuthStore } from '@/shared/lib/commercetools/auth-state';

const AuthGuard = () => {
  const isAuthenticated = useAuthStore((state) => {
    console.log('[AuthGuard] isAuthenticated:', state.isAuthenticated);
    return state.isAuthenticated;
  });
  return isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
};

const PrivateGuard = () => {
  const isAuthenticated = useAuthStore((state) => {
    console.log('[PrivateGuard] isAuthenticated:', state.isAuthenticated);
    return state.isAuthenticated;
  });
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      }
    ]
  },
  {
    element: <PrivateGuard />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/profile',
            element: <div>ProfilePage</div>,
          }
        ]
      }
    ]
  },
  {
    element: <AuthGuard />,
    children: [
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
    ],
  },
  {
    element: <ErrorLayout />,
    children: [
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <Navigate to={ROUTES.NOT_FOUND} replace />,
      },
    ],
  },
]);
