import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { theme } from '@/app/theme';
import { useAuthStore } from '@/features/auth/auth-state';
import { apiClientManager } from '@/shared/lib/commercetools';
import { notifyError } from '@/shared/utils/custom-notifications';

export const AppProvider = () => {
  const { setPending, logout } = useAuthStore();
  useEffect(() => {
    const initializeApp = async () => {
      setPending();
      try {
        await apiClientManager.init();
        logout();
      } catch (err) {
        notifyError(err, { message: 'Failed to connect to commercetools' });
        logout();
      }
    };

    initializeApp();
  }, [logout, setPending]);
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications
        position="top-right"
        styles={{ notification: { maxWidth: '20rem' } }}
      />
      <RouterProvider router={router} />
    </MantineProvider>
  );
};
