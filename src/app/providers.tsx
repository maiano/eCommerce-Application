import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { theme } from '@/app/theme';
import { useAuthStore } from '@/features/auth/auth-state';
import { useCartStore } from '@/shared/hooks/useCartStore';
import { apiClientManager } from '@/shared/lib/commercetools';
import { CenterLoader } from '@/shared/ui/CenterLoader';
import { notifyError } from '@/shared/utils/custom-notifications';

export const AppProvider = () => {
  const { setPending, setUnauthenticated, setAuthenticated, setClientReady } =
    useAuthStore();

  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    const initializeApp = async () => {
      setPending();
      try {
        const { authType } = await apiClientManager.init();
        setClientReady(true);

        await fetchCart();

        if (authType === 'password') {
          setAuthenticated();
        } else {
          setUnauthenticated();
        }
      } catch (err) {
        notifyError(err, { message: 'Failed to connect to commercetools' });
        setUnauthenticated();
        setClientReady(true);
      }
    };

    initializeApp();
  }, [
    setUnauthenticated,
    setPending,
    setAuthenticated,
    setClientReady,
    fetchCart,
  ]);
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications
        position="top-right"
        styles={{ notification: { maxWidth: '20rem' } }}
      />
      <Suspense fallback={<CenterLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </MantineProvider>
  );
};
