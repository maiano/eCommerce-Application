import { createBrowserRouter } from 'react-router';
import { AuthLayout } from '@/app/layouts/AuthLayouts';
import { ErrorLayout } from '@/app/layouts/ErrorLayout';
import { MainLayout } from '@/app/layouts/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RegistrationPage } from '@/pages/RegistrationPage';

const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  NOT_FOUND: '*',
} as const;

// export const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path={ROUTES.HOME} element={<HomePage />} />
//       <Route path={ROUTES.LOGIN} element={<LoginPage />} />
//       <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   );
// };

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
