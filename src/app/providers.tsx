import { MantineProvider } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { theme } from '@/app/theme';
import { initApiClient } from '@/shared/lib/commercetools';

export const AppProvider = () => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initApiClient();
      } catch (error) {
        notifications.show({
          message: 'Failed to connect to commercetools',
          color: 'red',
        });
        console.log('api client init error:', error);
      }
    };

    initializeApp();
  }, []);
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};
