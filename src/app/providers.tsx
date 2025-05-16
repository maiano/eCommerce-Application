import { MantineProvider, Notification } from '@mantine/core';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { theme } from '@/app/theme';
import { initApiClient } from '@/shared/lib/commercetools';

export const AppProvider = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initApiClient();
      } catch (err) {
        console.error('API client init error:', err);
        setError('Failed to connect to commercetools');
      }
    };

    initializeApp();
  }, []);
  return (
    <MantineProvider theme={theme}>
      {error && (
        <Notification
          color="red"
          withCloseButton
          closeButtonProps={{ 'aria-label': 'Hide notification' }}
          onClose={() => setError(null)}
          style={{
            maxWidth: '280px',
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 1000,
            borderRadius: '8px',
          }}
        >
          {error}
        </Notification>
      )}
      <RouterProvider router={router} />
    </MantineProvider>
  );
};
