import { lazy, useEffect } from 'react';
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
import { CenterLoader } from '@/shared/ui/CenterLoader';

const CatalogPage = lazy(() => import('@/pages/CatalogPage/CatalogPage'));
const ProductPage = lazy(() => import('@/pages/ProductPage/ProductPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage/ProfilePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegistrationPage = lazy(
  () => import('@/pages/RegistrationPage/RegistrationPage'),
);
const AboutUsPage = lazy(() => import('@/pages/AboutPage/AboutPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));
const CartPage = lazy(() => import('@/pages/CartPage/CartPage'));

const RedirectGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNeedToRedirect = useAuthStore((state) => state.isNeedToRedirect);
  const resetRedirect = useAuthStore((state) => state.resetRedirect);

  useEffect(() => {
    if (isNeedToRedirect) {


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
    errorElement: <ErrorLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <RedirectGuard />,
        children: [
          { path: ROUTES.CATALOG, element: <CatalogPage /> },
          { path: ROUTES.PRODUCT, element: <ProductPage /> },
          { path: ROUTES.CART, element: <CartPage /> },
          { path: ROUTES.ABOUT, element: <AboutUsPage />},
          {
            element: <PrivateGuard />,
            children: [{ path: ROUTES.PROFILE, element: <ProfilePage /> }],
          },
          {
            element: <AuthGuard />,
            children: [
              {
                element: <AuthLayout />,
                children: [
                  { path: ROUTES.LOGIN, element: <LoginPage /> },
                  { path: ROUTES.REGISTRATION, element: <RegistrationPage /> },
                ],
              },
            ],
          },
          { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
          { path: '*', element: <Navigate to={ROUTES.NOT_FOUND} replace /> },
        ],
      },
    ],
  },
]);
