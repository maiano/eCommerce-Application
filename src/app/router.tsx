import { useEffect } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { AuthLayout } from '@/app/layouts/AuthLayouts';
import { ErrorLayout } from '@/app/layouts/ErrorLayout';
import { MainLayout } from '@/app/layouts/MainLayout';
import { ROUTES } from '@/app/routes';
import { useAuthStore } from '@/features/auth/auth-state';
import { HomePage } from '@/pages/HomePage/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { RegistrationPage } from '@/pages/RegistrationPage/RegistrationPage';
import { CenterLoader } from '@/shared/ui/CenterLoader';

const RedirectGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNeedToRedirect = useAuthStore((state) => state.isNeedToRedirect);
  const resetRedirect = useAuthStore((state) => state.resetRedirect);

  useEffect(() => {
    if (isNeedToRedirect) {
      if (
        location.pathname === ROUTES.LOGIN ||
        location.pathname === ROUTES.REGISTRATION
      ) {
        resetRedirect();
        return;
      }

      navigate(ROUTES.HOME);
      resetRedirect();
    }
  }, [isNeedToRedirect, navigate, resetRedirect, location.pathname]);

  return <Outlet />;
};

const AuthGuard = () => {
  const { status } = useAuthStore();
  console.log('[AuthGuard] status:', status);

  if (status === 'PENDING') {
    return <CenterLoader />;
  }

  return status === 'AUTHENTICATED' ? (
    <Navigate to={ROUTES.HOME} replace />
  ) : (
    <Outlet />
  );
};

const PrivateGuard = () => {
  const { status } = useAuthStore();
  const location = useLocation();
  console.log('[PrivateGuard] status:', status);

  if (status === 'PENDING') {
    return <CenterLoader />;
  }

  return status === 'AUTHENTICATED' ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />
  );
};

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
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
                path: ROUTES.PROFILE,
                element: <ProfilePage />,
              },
            ],
          },
        ],
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
    ],
  },
]);
