import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { theme } from '@/app/theme';
import { apiClientManager } from '@/shared/lib/commercetools';

export const AppProvider = () => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await apiClientManager.init();
      } catch (err) {
        console.error('API client init error:', err);

        notifications.show({
          message: 'Failed to connect to commercetools',
          color: 'red',
          autoClose: 5000,
          withCloseButton: true,
        });
      }
    };

    initializeApp();
  }, []);
  return (
    <MantineProvider theme={theme}>
      <Notifications
        position="top-right"
        styles={{ notification: { maxWidth: '20rem' } }}
      />
      <RouterProvider router={router} />
    </MantineProvider>
  );
};
