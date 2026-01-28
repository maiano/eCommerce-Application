import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { theme } from '@/app/theme';
import { useAuthStore } from '@/features/auth/auth-state';
import { CenterLoader } from '@/shared/ui/CenterLoader';

export const AppProvider = () => {
  const { setUnauthenticated, setClientReady } = useAuthStore();

  useEffect(() => {
    // Mock initialization - no CommerceTools connection needed
    setClientReady(true);
    setUnauthenticated();
  }, [setUnauthenticated, setClientReady]);

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
