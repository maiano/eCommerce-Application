import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { theme } from '@/app/theme';
import { apiClientManager } from '@/shared/lib/commercetools';
import { notifyError } from '@/shared/utils/custom-notifications';

export const AppProvider = () => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await apiClientManager.init();
      } catch (err) {
        notifyError(err, { message: 'error' });
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
