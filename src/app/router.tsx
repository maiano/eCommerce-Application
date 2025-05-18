import { createBrowserRouter, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AuthLayout } from '@/app/layouts/AuthLayouts';
import { ErrorLayout } from '@/app/layouts/ErrorLayout';
import { MainLayout } from '@/app/layouts/MainLayout';
import { ROUTES } from '@/app/routes';
import { HomePage } from '@/pages/HomePage/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { useAuthStore } from '@/features/auth/auth-state';
import { useEffect } from 'react';
import { Loader } from '@mantine/core'

const RedirectGuard = () => {
  const navigate = useNavigate();
  const isNeedToRedirect = useAuthStore((state) => state.isNeedToRedirect);
  const resetRedirect = useAuthStore((state) => state.resetRedirect);

  useEffect(() => {
    if (isNeedToRedirect) {
      navigate(ROUTES.HOME);
      resetRedirect();
    }
  }, [isNeedToRedirect, navigate, resetRedirect]);

  return <Outlet />;
};

const AuthGuard = () => {
  const { isAuthenticated, isPending } = useAuthStore();
  console.log('[AuthGuard] isPending:', isPending);

  if (isPending) {
    return <Loader color="blue" size="lg" type="bars" />;
  }

  return isAuthenticated
    ? <Navigate to={ROUTES.HOME} replace />
    : <Outlet />;
};

const PrivateGuard = () => {
  const { isAuthenticated, isPending } = useAuthStore();
  const location = useLocation();
  console.log('[PrivateGuard] isPending:', isPending);

  if (isPending) {
    return <Loader color="blue" size="lg" type="bars" />;
  }

  return isAuthenticated
    ? <Outlet />
    : <Navigate to={ROUTES.HOME} replace state={{ from: location.pathname }} />;
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
    element: <RedirectGuard />,
    children: [
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
    ]
  }
]);
